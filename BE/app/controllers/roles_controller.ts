import Role from '#models/role'
import type { HttpContext } from '@adonisjs/core/http'
import Roles from '../Enum/Roles.js'

export default class RolesController {
    Get = async ({response}:HttpContext) => {
        let roles = await Role.all()
        return response.send(roles)
    }
    // GetCo = async ({response}:HttpContext) => {
    //     let roles = await Role.query().where('id',Roles.STUDENT).orWhere('id',Roles.GUEST)
    //     return response.send(roles)
    // }
}