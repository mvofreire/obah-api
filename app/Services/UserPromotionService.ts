import Promotion from 'App/Models/Promotion'
import User from 'App/Models/User'
import { IUserPromotion } from 'Contracts/interfaces/UserPromotionInterface'
import UserPromotion from 'App/Models/UserPromotion'
import { VoucherDTO } from 'Contracts/Dtos/voucher/VoucherDTO'

export class UserPromotionService implements IUserPromotion {
  public async loadVouchersByClient(clientId: number): Promise<VoucherDTO[]> {
    const query = UserPromotion.query()
    const data = await query.preload('promotion').where('user_id', clientId.toString())

    const vouchers: VoucherDTO[] = data.map((item) => ({
      expiration: item.expiration,
      title: item.promotion.title,
    }))
    return vouchers
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
}
