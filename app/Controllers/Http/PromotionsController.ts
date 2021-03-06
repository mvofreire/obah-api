import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PromotionService from '@ioc:Services/PromotionService'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PromotionsController {
  public async index({ auth, request }: HttpContextContract) {
    const { preload } = request.get()
    const user = auth.user
    const includes = preload?.split(',') || []
    const data = await PromotionService.loadByClient(user?.id as number, includes)
    return data
  }

  public async store({ request, auth }: HttpContextContract) {
    const owner = auth.user
    const data = request.post()
    const model = await PromotionService.create(owner?.id as number, data)
    return model
  }

  public async attachImage({ request }: HttpContextContract) {
    const { promotionId } = request.post()

    const image = request.file('image')
    if (!!image) {
      const result = PromotionService.attachImage(promotionId, image)
      return result
    }

    return false
  }

  public async show({ params, auth }: HttpContextContract) {
    const { id } = params
    const model = await PromotionService.loadById(id, auth.user?.id)
    return model
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.post()
    const model = await PromotionService.updateById(id, data)
    return model
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    return await PromotionService.destroy(id)
  }

  public async showInBounds({ request }: HttpContextContract) {
    const postsSchema = schema.create({
      north: schema.number(),
      south: schema.number(),
      east: schema.number(),
      west: schema.number(),
    })
    const { north, south, east, west } = await request.validate({
      schema: postsSchema,
    })
    const data = PromotionService.loadPromotionsInsideBounds(north, south, east, west)
    return data
  }
}
