import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from '@ioc:Services/UserService'
import PromotionService from '@ioc:Services/PromotionService'
import { USER_TYPE } from 'App/Enums/User'

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

  public async emailExists({ request }: HttpContextContract) {
    const { email } = request.post()
    const model = await UserService.loadByEmail(email)
    if (model.type === USER_TYPE.Client) {
      return model
    } else {
      throw new Error('Não existe nenhuma Loja com esse e-mail')
    }
  }
}
