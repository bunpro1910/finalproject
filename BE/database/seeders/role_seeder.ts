import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '../../app/Enum/Roles.js'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        name:'Admin'
      },{
        name:'Customer'
      }
    ])
  
  }
}