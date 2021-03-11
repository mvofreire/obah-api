import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Promotions extends BaseSchema {
  protected tableName = 'promotions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('sub_title').notNullable()
      table.string('description').notNullable()
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
