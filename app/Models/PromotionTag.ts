import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tag from './Tag'
import Promotion from './Promotion'

export default class PromotionTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tagId: number

  @column()
  public promotionId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Promotion)
  public promotion: BelongsTo<typeof Promotion>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>
}
