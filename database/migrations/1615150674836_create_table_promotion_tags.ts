import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PromotionTags extends BaseSchema {
  protected tableName = 'promotion_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table)=>{
      table.increments('id')

      table.integer('promotion_id').unsigned().references('id').inTable('promotions')
      table.integer('tag_id').unsigned().references('id').inTable('tags')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
