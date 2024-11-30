import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'


import Category from './category.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()

  declare name: string

  @column()
  declare description: string
  
  @column()
  declare categoryId: number

  @column()
  declare price:number

  @column()
  declare image:string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}