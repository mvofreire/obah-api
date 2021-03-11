import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Promotion from './Promotion'

export default class PromotionImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public filename: string

  @column()
  public size: number

  @column()
  public path: string

  @column()
  public config: {}

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public promotionId: number

  @belongsTo(() => Promotion)
  public promotion: BelongsTo<typeof Promotion>
}
