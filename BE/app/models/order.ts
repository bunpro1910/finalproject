import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Status from './status.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Orderitem from './orderitem.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number
  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>
  @column()
  declare address: string
  @column()
  declare phone: string
  @column()
  declare name: string
  @column()
  declare ischeckout: boolean
  
  @hasMany(()=>Orderitem)
  declare orderItems :HasMany<typeof Orderitem>

  @column()
  declare userId: number
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}