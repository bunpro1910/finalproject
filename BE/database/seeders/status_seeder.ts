import Status from '#models/status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'


export default class extends BaseSeeder {
  async run() {
    await Status.createMany([
      {
        name:'Pending'
      },{
        name:'Approved'
      },{
        name:'Reject'
      }
    ])
  }
}