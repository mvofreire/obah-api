import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Validator {
  public async handle ({ route }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
