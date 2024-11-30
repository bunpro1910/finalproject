import vine from '@vinejs/vine'
import { dateTimeRule } from './dateTimeRule.js'
import { VineDateTime } from './dateTimeSchema.js'
export const PostCategoryForm = vine.compile(
    vine.object({
        name:vine.string(),
        description:vine.string(), 
        // closuredate: new VineDateTime,
        // finalclosuredate:new VineDateTime,
    })

)