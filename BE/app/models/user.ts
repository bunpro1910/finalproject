import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, afterFetch, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'


import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Faculty from './category.js'
import { after } from 'node:test'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare roleId: number
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
  @column()
  declare password: string

  @manyToMany(()=>Faculty)
  declare faculty:ManyToMany<typeof Faculty>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null


  static accessTokens = DbAccessTokensProvider.forModel(User)
}