import { BaseTask } from 'adonis5-scheduler/build'
import { PROMOTION_STATUS } from 'App/Enums/Promotion'
import Promotion from 'App/Models/Promotion'

export default class CheckPromotion extends BaseTask {
  public static get schedule() {
    return '45 * * * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    const data = await Promotion.query().preload('images').where('status', PROMOTION_STATUS.Pending)

    console.log('Iniciando processo de Ativação de Promoções')
    console.log(`Quantidade:${data.length}`)

    const promises: Promise<Promotion>[] = []
    data.forEach((promo) => {
      if (promo.images.length > 0) {
        console.log(`- Ativando Promoção ${promo.id}`)
        promo.status = PROMOTION_STATUS.Active
        promises.push(promo.save())
      }
    })

    await Promise.all(promises)
    console.log('Finalizando processo de Ativação')
  }
}
