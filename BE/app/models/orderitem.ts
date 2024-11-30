import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Orderitem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column()
  declare orderId: number
  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
  @column()
  declare productId: number
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
  @column()
  declare quantity: number
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}