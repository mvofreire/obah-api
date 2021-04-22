import Promotion from 'App/Models/Promotion'
import User from 'App/Models/User'
import { IUserPromotion } from 'Contracts/interfaces/UserPromotionInterface'
import UserPromotion from 'App/Models/UserPromotion'
import { VoucherDTO } from 'Contracts/Dtos/voucher/VoucherDTO'
import { PROMOTION_STATE, PROMOTION_STATUS } from 'App/Enums/Promotion'

export class UserPromotionService implements IUserPromotion {
  public async loadVouchersByClient(clientId: number): Promise<VoucherDTO[]> {
    const query = UserPromotion.query()
    const data = await query
      .preload('promotion', (promotion) => promotion.preload('images'))
      .preload('participant')
      .where('user_id', clientId.toString())

    return data.map((item) => VoucherDTO.fromUserPromotion(item))
  }

  public async loadParticipantsByPromotion(promotionId: number): Promise<User[]> {
    const query = UserPromotion.query()
    const data = await query.preload('participant').where('promotion_id', promotionId.toString())

    const participants = data.map((item) => item.participant)
    return participants
  }

  public async loadPromotionsByClient(clientId: number): Promise<Promotion[]> {
    const query = UserPromotion.query()
    const data = await query.preload('promotion').where('user_id', clientId.toString())

    const promotions = data.map((item) => item.promotion)
    return promotions
  }

  public async loadPromotionsByStore(storeId: number): Promise<Promotion[]> {
    const query = Promotion.query()
    const promotions = await query
      .preload('images')
      .preload('participants')
      .preload('tags', (m) => m.preload('tag'))
      .where('user_id', storeId)
      .where('status', PROMOTION_STATUS.Active)
      .where('is_removed', PROMOTION_STATE.Enabled)
    return promotions
  }

  public async loadVoucherById(id: number): Promise<VoucherDTO> {
    const model = await UserPromotion.findOrFail(id)
    await model.preload('participant')
    await model.preload('promotion', (promotion) =>
      Promise.all([
        promotion.preload('participants'),
        promotion.withCount('participants'),
        promotion.preload('images'),
        promotion.preload('store'),
      ])
    )
    return VoucherDTO.fromUserPromotion(model)
  }
}
