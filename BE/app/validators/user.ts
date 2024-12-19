import vine from '@vinejs/vine'

export const PostUserForm = vine.compile(
    vine.object({
        fullname:vine.string(),
        email: vine.string().email(),
        role:vine.number().positive()
    })

)
export const PutUserForm = vine.compile(
    vine.object({
        fullname:vine.string(),
        email: vine.string().email(),
        password:vine.string(),
        role:vine.number().positive()
    })

)
export const Changepass = vine.compile(
    vine.object({

        oldpassword:vine.string(),
        newpassword:vine.string(),
        confirmpassword:vine.string().confirmed({
            confirmationField:'newpassword'
        }),
    })

)