import { USER_PROMOTION_STATUS } from 'App/Enums/UserPromotion'
import UserPromotion from 'App/Models/UserPromotion'
import { DateTime } from 'luxon'

export class VoucherDTO {
  id: number
  expiration: DateTime
  promotionTitle: string
  promotionDescription: string
  promotionImages: string[]
  participantName: string
  totalParticipants: number
  storeId: number
  storeName: string
  storeImage: string
  status: USER_PROMOTION_STATUS

  static fromUserPromotion(userPromotion: UserPromotion): VoucherDTO {
    const voucher: VoucherDTO = new VoucherDTO()
    voucher.id = userPromotion.id
    voucher.status = userPromotion.status
    voucher.expiration = userPromotion.expiration
    voucher.promotionTitle = userPromotion.promotion?.title
    voucher.promotionDescription = userPromotion.promotion?.description
    voucher.totalParticipants = userPromotion.promotion.totalParticipants
    voucher.promotionImages = userPromotion.promotion?.images.map((x) => x.path)

    if (userPromotion.promotion?.store) {
      voucher.storeId = userPromotion.promotion.store.id
      voucher.storeImage = userPromotion.promotion.store.image
      voucher.storeName = userPromotion.promotion.store.name
    }

    voucher.participantName = userPromotion.participant?.name
    return voucher
  }
}
