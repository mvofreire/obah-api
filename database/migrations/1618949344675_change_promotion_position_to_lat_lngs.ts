import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChangePromotionPositionToLatLngs extends BaseSchema {
  protected tableName = 'promotions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('position')
      
      table.float('position_lat')
      table.float('position_lng')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('position')

      table.dropColumn('position_lat')
      table.dropColumn('position_lng')
    })
  }
}
