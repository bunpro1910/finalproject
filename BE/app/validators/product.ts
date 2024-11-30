import Faculty from '#models/category'
import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'
import { VineDateTime } from './dateTimeSchema.js'

import Status from '#models/status'
import Category from '#models/category'



export const PostProductForm = vine.compile(
    vine.object({
        // file:vine.file({extnames:['png','jpg','docs']}),
        name:vine.string(),
        description:vine.string(),
        price:vine.number(),
        image:vine.file({extnames:['png','jpg']}),
        categoryid:vine.number().exists(exists(Category.table,Category.primaryKey)),
        
        // content:vine.string() 

    })

)
export const PutProductForm = vine.compile(
    vine.object({
        // file:vine.file({extnames:['png','jpg','docs']}),
        name:vine.string(),
        description:vine.string(),
        price:vine.number(),
        image:vine.file({extnames:['png','jpg']}).nullable().optional(),
        categoryid:vine.number().exists(exists(Category.table,Category.primaryKey)),
        
        // content:vine.string() 

    })

)