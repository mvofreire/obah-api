import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'

import PromotionImage from 'App/Models/PromotionImage'
import User from 'App/Models/User'
import UserPromotion from 'App/Models/UserPromotion'
import PromotionTag from './PromotionTag'

export default class Promotion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public subTitle: string

  @column()
  public description: string

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number

  @column()
  public status: number

  @column()
  public isRemoved: number

  //RelationShips
  @belongsTo(() => User)
  public store: BelongsTo<typeof User>

  @hasMany(() => UserPromotion)
  public participants: HasMany<typeof UserPromotion>

  @hasMany(() => PromotionImage)
  public images: HasMany<typeof PromotionImage>

  @hasMany(() => PromotionTag)
  public tags: HasMany<typeof PromotionTag>

  //Virtuals
  @computed()
  public get totalParticipants() {
    return this.$extras.participants_count
  }
}
