import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from '@ioc:Services/UserService'
import { USER_TYPE } from 'App/Enums/User'

export default class StoresController {
  public async index() {
    const data = await UserService.loadAllStores()
    return data
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const store = await UserService.loadStore(id)
    if (!!store) {
      return store
    } else {
      return response.notFound()
    }
  }

  public async emailExists({ request }: HttpContextContract) {
    const { email } = request.post()
    const model = await UserService.loadByEmail(email)
    if (model.type === USER_TYPE.Store) {
      return model
    } else {
      throw new Error('Não existe nenhuma Loja com esse e-mail')
    }
  }
}
