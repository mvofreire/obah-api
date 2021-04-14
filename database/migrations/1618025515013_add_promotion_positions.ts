import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPromotionPositions extends BaseSchema {
  protected tableName = 'promotions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('position')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('position')
    })
  }
}
