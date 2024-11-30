import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Roles from '../Enum/Roles.js'
type  roleid  = 'ADMIN' | "MARKETING_MANAGER"
export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { guards: roleid[] }) {
    
    const roleIds = options.guards.map(guard => Roles[guard])
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (!roleIds.includes(ctx.auth.user?.roleId||-1)) {
      return ctx.response.unauthorized('You dont have a permission')
    }

    const output = await next()
    return output
  }
}