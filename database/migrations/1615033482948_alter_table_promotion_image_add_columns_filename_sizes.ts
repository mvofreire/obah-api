import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PromotionImages extends BaseSchema {
  protected tableName = 'promotion_images'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('filename').notNullable()
      table.integer('size').notNullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('filename')
      table.dropColumn('size')
    })
  }
}
