import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Promotion from 'App/Models/Promotion'
import User from 'App/Models/User'
import { USER_PROMOTION_STATUS } from 'App/Enums/UserPromotion'

export default class UserPromotion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public expiration: DateTime

  @column()
  public userId: number

  @column()
  public promotionId: number

  @column()
  public status: USER_PROMOTION_STATUS

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Promotion)
  public promotion: BelongsTo<typeof Promotion>

  @belongsTo(() => User)
  public participant: BelongsTo<typeof User>
}
