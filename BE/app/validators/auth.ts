import vine from '@vinejs/vine'


export const LoginForm = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8),
    })

)
export const RegisterForm = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8),
        repassword: vine.string().minLength(8).confirmed({
            confirmationField: 'password'
        })
    })

)

