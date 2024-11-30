import Status from '#models/status'
import type { HttpContext } from '@adonisjs/core/http'

export default class StatusesController {
    Get = async ({ response, auth }: HttpContext) => {
        let status =await Status.query()


        return response.send(status)
    }
}