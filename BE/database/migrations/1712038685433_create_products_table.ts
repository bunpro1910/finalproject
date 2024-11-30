import { BaseSchema } from '@adonisjs/lucid/schema';


export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('category_id').references('id').inTable('categories').notNullable().unsigned().onDelete('CASCADE')
      table.string('description')
      table.integer('price')
      table.string('image')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}