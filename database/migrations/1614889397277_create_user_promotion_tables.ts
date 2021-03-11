import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPromotion extends BaseSchema {
  protected tableName = 'user_promotions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('expiration').notNullable()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('promotion_id').unsigned().references('id').inTable('promotions')

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
