import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Promotion from 'App/Models/Promotion'
import UserImage from 'App/Models/UserImage'
import UserPromotion from 'App/Models/UserPromotion'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public type: string

  @column()
  public image: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => UserImage)
  public images: HasMany<typeof UserImage>

  @hasMany(() => Promotion)
  public promotions: HasMany<typeof Promotion>

  @hasMany(() => UserPromotion)
  public vouchers: HasMany<typeof UserPromotion>
}
