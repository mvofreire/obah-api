import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserPromotionService from '@ioc:Services/UserPromotionService'

export default class VoucherController {
  public async index({ auth }: HttpContextContract) {
    return UserPromotionService.loadVouchersByClient(auth.user?.id as number)
  }

  public async show({ params, auth }: HttpContextContract) {
    const { id } = params
    return UserPromotionService.loadVoucherById(id)
  }
}
