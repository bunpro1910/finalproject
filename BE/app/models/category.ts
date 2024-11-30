import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasManyThrough, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'



export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name:string
  @column()
  declare description:string

  @hasMany(()=>Product)
  declare products :HasMany<typeof Product>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}