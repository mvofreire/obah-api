import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from '@ioc:Services/UserService'

export default class UsersController {
  public async index() {
    const data = await UserService.loadAll()
    return data
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    const model = await UserService.loadOne(id)
    return model
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const data = request.post()

    const model = await UserService.updateById(id, data)
    return model
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const result = await UserService.destroyById(id)
    return result
  }

  public async attachImage(context: HttpContextContract) {
    const user = context.auth.user
    const file = context.request.file('image')
    if (!!file) {
      const model = await UserService.attachImage(user?.id as number, file)
      return model
    }
  }

  public async changeImage(context: HttpContextContract) {
    const file = context.request.file('image')
    const user = context.auth.user
    if (user && file) {
      return UserService.changeImage(user.id, file)
    }
  }
}
