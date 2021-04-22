import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { USER_PROMOTION_STATUS } from 'App/Enums/UserPromotion'

export default class UserPromotions extends BaseSchema {
  protected tableName = 'user_promotions'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .enum('status', Object.values(USER_PROMOTION_STATUS))
        .notNullable()
        .defaultTo(USER_PROMOTION_STATUS.Pending)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
