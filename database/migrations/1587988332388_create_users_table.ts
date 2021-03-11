import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { USER_TYPE } from 'App/Enums/User'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.enum('type', Object.values(USER_TYPE)).defaultTo(USER_TYPE.Client).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
