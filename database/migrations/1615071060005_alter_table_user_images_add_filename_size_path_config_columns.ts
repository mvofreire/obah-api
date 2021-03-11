import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserImage extends BaseSchema {
  protected tableName = 'user_images'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('filename')
      table.integer('size')
      table.string('path')
      table.json('config')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('filename')
      table.dropColumn('size')
      table.dropColumn('path')
      table.dropColumn('config')
    })
  }
}
