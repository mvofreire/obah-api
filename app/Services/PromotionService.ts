import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Promotion from 'App/Models/Promotion'
import PromotionImage from 'App/Models/PromotionImage'
import { IPromotionService } from 'Contracts/interfaces/PromotionInterfaces'
import FileUpload from '@ioc:Utils/FileUpload'
import { FileUploadDTO } from 'Contracts/Dtos/promotion/FileUploadDTO'
import { ExtractModelRelations } from '@ioc:Adonis/Lucid/Relations'
import User from 'App/Models/User'
import { PROMOTION_STATE, PROMOTION_STATUS } from 'App/Enums/Promotion'
import { XRay } from 'aws-sdk'

export class PromotionService implements IPromotionService {
  public async attachImage(id: number, file: MultipartFileContract): Promise<PromotionImage> {
    const model = await this.loadById(id)
    const { size, clientName, tmpPath, type, subtype } = file
    const fileUpload: FileUploadDTO = await FileUpload.uploadImage(
      tmpPath as string,
      `${type}/${subtype}`
    )
    return model.related('images').create({
      size,
      filename: clientName,
      path: fileUpload.Location,
      config: fileUpload,
    })
  }

  public async updateById(id: number, data: any): Promise<Promotion> {
    const model = await this.loadById(id)
    model.merge(data)
    model.save()
    return model
  }

  public async create(storeId: number, data: any): Promise<Promotion> {
    const { tags, ...promotion } = data
    const store = await User.findOrFail(storeId)

    //add promotion to store
    const model = await store.related('promotions').create(promotion)

    //add tags
    await model.related('tags').createMany(tags.map((tagId) => ({ tagId })))

    return model
  }

  public async destroy(id: number) {
    const model = await this.loadById(id)
    model.isRemoved = PROMOTION_STATE.Removed
    return model.save()
  }

  public async loadByClient(
    clientId: number,
    includes: ExtractModelRelations<Promotion>[] = []
  ): Promise<Promotion[]> {
    const query = Promotion.query()

    includes.forEach((include) => {
      query.preload(include)
    })

    query.where('is_removed', PROMOTION_STATE.Enabled)

    const data = await query.withCount('participants').where('user_id', clientId)
    return data
  }

  public async loadById(id: number, requesterUserId?: number): Promise<Promotion> {
    const model = await Promotion.findOrFail(id)

    await model.preload('images')
    await model.preload('store')
    await model.preload('participants')

    if (!!requesterUserId) {
      const _partipant = model.participants?.map((x) => x.userId).includes(requesterUserId)
      model.participating = _partipant
      const voucher = model.participants.find((x) => x.userId === requesterUserId)
      model._voucherId = voucher?.id
    }
    return model
  }

  public async loadByStatus(status: PROMOTION_STATUS): Promise<Promotion[]> {
    return await Promotion.query().where('status', status)
  }

  public async loadHighligthPromotions(): Promise<Promotion[]> {
    const query = Promotion.query()

    query.preload('images').preload('store')
    query.where('status', PROMOTION_STATUS.Active)
    query.where('is_removed', PROMOTION_STATE.Enabled)

    return await query
  }

  public async loadExplorePromotions() {
    const query = Promotion.query()

    query.preload('images').preload('store')
    query.where('status', PROMOTION_STATUS.Active)
    query.where('is_removed', PROMOTION_STATE.Enabled)

    return await query
  }

  public async loadPopularPromotions() {
    const query = Promotion.query()

    query.preload('images').preload('store')
    query.where('status', PROMOTION_STATUS.Active)
    query.where('is_removed', PROMOTION_STATE.Enabled)

    return await query
  }
}
