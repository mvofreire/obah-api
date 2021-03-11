import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from '@ioc:Services/UserService'

export default class AuthController {
  public async login({ request, auth }) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async registerClient({ request }: HttpContextContract) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    const data = { name, email, password }

    const model = await UserService.createClient(data)
    return model
  }

  public async registerStore({ request }: HttpContextContract) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    const data = { name, email, password }

    const model = await UserService.createStore(data)
    return model
  }
}
