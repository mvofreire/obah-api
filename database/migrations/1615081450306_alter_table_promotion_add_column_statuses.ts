import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PROMOTION_STATUS } from 'App/Enums/Promotion'

export default class Promotions extends BaseSchema {
  protected tableName = 'promotions'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.enum('status', Object.values(PROMOTION_STATUS)).defaultTo(PROMOTION_STATUS.Pending)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
