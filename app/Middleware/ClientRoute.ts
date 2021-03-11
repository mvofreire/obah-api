import { AuthenticationException } from '@adonisjs/auth/build/src/Exceptions/AuthenticationException'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_TYPE } from 'App/Enums/User'

export default class ClientRoute {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user
    console.log(user?.type)

    if (user?.type !== USER_TYPE.Client) {
      throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
    }
    await next()
  }
}
