import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from '@ioc:Services/UserService'
import PromotionService from '@ioc:Services/PromotionService'
import UserPromotionService from '@ioc:Services/UserPromotionService'

export default class ClientsController {
  public async addVoucher({ request, auth }: HttpContextContract) {
    const { promotionId } = request.post()
    const user = await auth.user
    return await UserService.createVoucher(user?.id as number, promotionId)
  }

  public async loadHighlightPromotions() {
    return await PromotionService.loadHighligthPromotions()
  }

  public async loadPopularPromotions() {
    return await PromotionService.loadPopularPromotions()
  }

  public async loadExplorePromotions() {
    return await PromotionService.loadExplorePromotions()
  }

  public async loadPromotionByStore({ params }: HttpContextContract) {
    const { id } = params
    return await PromotionService.loadByClient(id)
  }

  public async loadMyVouchers({ auth }: HttpContextContract) {
    const user = await auth.user
    if (user) {
      return await UserPromotionService.loadVouchersByClient(user.id)
    }
  }
}
