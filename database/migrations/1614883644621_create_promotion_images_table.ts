import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PromotionImages extends BaseSchema {
  protected tableName = 'promotion_images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table
        .integer('promotion_id')
        .unsigned()
        .references('id')
        .inTable('promotions')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
