import User from '#models/user'
import { LoginForm, RegisterForm } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    Login = async ({ request, response }: HttpContext) => {
        const payload = await request.validateUsing(LoginForm)

        const user = await User.findBy('email', payload.email)

        if (!user) {
            return response.abort({errors:[{
                message:  'Username Not Found'
            }]}, 422)
        
        }

        /**
         * Verify the password using the hash service
         */
        let result = await hash.verify(user.password, payload.password)
        if (!result) {
            return response.abort({errors:[{
                message:'Password Mismatch'
            }]}, 422)
        }
        let token = await User.accessTokens.create(user)
        return {
            token: token.value?.release()
        }
    }
    Register = async ({ request, response }: HttpContext) => {
        const payload = await request.validateUsing(RegisterForm)
        const user = await User.findBy('email', payload.email)

        if (user) {
            
            return response.abort('Username is Same', 400)
        }
        let newUser = new User()
        newUser.email = payload.email
        newUser.password = payload.password
        await newUser.save()
        let token = await User.accessTokens.create(newUser)
        return {
            token: token.value?.release()
        }

    }
    Profile = async ({ auth }: HttpContext) => {
        return auth.user
    }
}