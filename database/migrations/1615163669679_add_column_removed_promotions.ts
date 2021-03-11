import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PROMOTION_STATE } from 'App/Enums/Promotion'

export default class Promotions extends BaseSchema {
  protected tableName = 'promotions'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .enum('is_removed', Object.values(PROMOTION_STATE))
        .notNullable()
        .defaultTo(PROMOTION_STATE.Enabled)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_removed')
    })
  }
}
