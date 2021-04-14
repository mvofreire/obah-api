import UserPromotion from 'App/Models/UserPromotion'
import { DateTime } from 'luxon'

export class VoucherDTO {
  id: number
  expiration: DateTime
  promotionTitle: string
  promotionImages: string[]
  participantName: string
  storeId: number
  storeName: string
  storeImage: string

  static fromUserPromotion(userPromotion: UserPromotion): VoucherDTO {
    const voucher: VoucherDTO = new VoucherDTO()
    voucher.id = userPromotion.id
    voucher.expiration = userPromotion.expiration
    voucher.promotionTitle = userPromotion.promotion?.title
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
