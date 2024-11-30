import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'
import User from '#models/user'
import Orderitem from '#models/orderitem'
export const PostOrderForm = vine.compile(
    vine.object({
        phone:vine.string(),
        address:vine.string(), 
        name:vine.string(),
        userid:vine.number().exists(exists(User.table,User.primaryKey)),
        // closuredate: new VineDateTime,
        // finalclosuredate:new VineDateTime,
    })

)
export const PutOrderItemForm = vine.compile(
    vine.object({
        
        quantity:vine.number(),
        orderitemid:vine.number().exists(exists(Orderitem.table,Orderitem.primaryKey))
        // closuredate: new VineDateTime,
        // finalclosuredate:new VineDateTime,
    })

)

export const CheckOutform = vine.compile(
    vine.object({
        phone:vine.string(),
        address:vine.string(), 
        fullname:vine.string(),

        // closuredate: new VineDateTime,
        // finalclosuredate:new VineDateTime,
    })

)
export const PostOrderItemForm = vine.compile(
    vine.object({
        productid:vine.number(), 
        quantity:vine.number(),
  
        // closuredate: new VineDateTime,
        // finalclosuredate:new VineDateTime,
    })

)