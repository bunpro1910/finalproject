import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([{
      fullName:"admin",
      password:'adminpassword',
      roleId:1,
      email:'admin@gmail.com'
    }])
  }
}