import Order from '#models/order'
import Orderitem from '#models/orderitem'
import { CheckOutform, PostOrderForm, PostOrderItemForm, PutOrderItemForm } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'
import STATUS from '../Enum/STATUS.js'
import crypto from 'crypto';
import axios from 'axios';
export default class OrdersController {
    Get = async ({ request,response, auth }: HttpContext) => {
        const payload = request.qs()
        let order = await Order.query().where('user_id',auth.user?.id||-1).andWhere('ischeckout',true).preload('user').preload('status')
        
        // if(payload.categoryid!== 'undefined' && payload.categoryid){
        //     order.where('category_id', payload.categoryid)
        //}
       
    

        return response.send(order)
    }
    GetCart = async ({ request,response, auth }: HttpContext) => {
      
        const order = await Order.query().where('user_id',auth.user?.id||-1).andWhere('ischeckout',false).preload('orderItems',x=>x.preload('product')).first()

        // if(payload.categoryid!== 'undefined' && payload.categoryid){
        //     order.where('category_id', payload.categoryid)
        //}
        console.log(order)

  

        return response.send(order)
    }
    AddItemToOrder= async(orderId:number,ProductId:number,quantity:number)=>{
        const orderitem = await Orderitem.query().where('order_id',orderId).andWhere('product_id',ProductId).first()
        if(orderitem){
            orderitem.quantity = orderitem.quantity+quantity
            await orderitem.save();
            return orderitem
        }
        const newOrderItem = new Orderitem()
        newOrderItem.orderId = orderId
        newOrderItem.productId = ProductId
        newOrderItem.quantity = quantity
        await newOrderItem.save();
        return newOrderItem
    }
    Additem = async ({ request, response,auth }: HttpContext) => {
        const payload = await request.validateUsing(PostOrderItemForm)

        const order = await Order.query().where('user_id',auth.user?.id||-1).andWhere('ischeckout',false).first()
        
      
        if(order){
          
            return await this.AddItemToOrder(order.id,payload.productid,payload.quantity);
            
        }else{
            const newOrder = new Order()
            newOrder.userId= auth.user?.id || -1
            newOrder.address =""
            newOrder.ischeckout = false
            newOrder.name=""
            newOrder.phone = ""
            await newOrder.save()
            return await this.AddItemToOrder(newOrder.id,payload.productid,payload.quantity);
        }

    }

    GetById = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        let order = await Order.query().where('id',id).preload('user').preload('orderItems',x=>x.preload('product')).first()
        return response.send(order)
    }

    Post = async ({ response, request, auth }: HttpContext) => {
        const payload = await request.validateUsing(PostOrderForm)
        const order = new Order()
        order.phone = payload.phone || ""
        order.name = payload.name
        order.address = payload.address
        order.userId = payload.userid

        
        await order.save()
        return order
    }
    Checkout = async ({ response, request, auth }: HttpContext) => {
        const payload = await request.validateUsing(CheckOutform)
        const order = await Order.query().where('user_id',auth.user?.id ||-1).andWhere('ischeckout',false).first()
        if(order){
            order.phone = payload.phone || ""
            order.name = payload.fullname
            order.address = payload.address
            order.userId = auth.user?.id ||-1
            order.ischeckout = true
            order.statusId = STATUS.PENDING
            await order.save()
            return order
        }else{
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })
        }
       
       
    }
    CheckoutMomo = async ({ response, request, auth }: HttpContext) => {
        const payload = await request.validateUsing(CheckOutform)
        const order = await Order.query().preload('orderItems',x=>x.preload('product')).where('user_id',auth.user?.id ||-1).andWhere('ischeckout',false).first()
        if(order){
            let total = order.orderItems.reduce((init,x)=>init+=x.quantity *x.product.price,0)
            
            const partnerCode = "MOMO";
            const accessKey = "F8BBA842ECF85";
            const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
            const requestId = partnerCode + new Date().getTime();
            const orderId = requestId;
            const orderInfo = "pay with MoMo";
            const redirectUrl = `http://localhost:3333/api/orders/checkout/momo/success?cartid=${order.id}&fullname=${payload.fullname}&address=${payload.address}&phone_number=${payload.phone}`;
            const ipnUrl = "https://callback.url/notify";
            const amount = `${total}`;
            const requestType = "captureWallet"
            const extraData = "";
            const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
            const signature = crypto.createHmac('sha256', secretkey)
              .update(rawSignature)
              .digest('hex');
            const requestBody = JSON.stringify({
              partnerCode: partnerCode,
              accessKey: accessKey,
              requestId: requestId,
              amount: amount,
              orderId: orderId,
              orderInfo: orderInfo,
              redirectUrl: redirectUrl,
              ipnUrl: ipnUrl,
              extraData: extraData,
              requestType: requestType,
              signature: signature,
              lang: 'en'
            });
            let result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create',requestBody,{    
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            })
            return {link:result.data.payUrl}
        }else{
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })
        }
       
       
    }
    MomoSuccess= async ({ response, request }: HttpContext) => {
        let query = request.qs()
        const order = await Order.find(query.cartid)
        if(order){
            order.phone = query.phone || ""
            order.name = query.fullname
            order.address = query.address
            order.ischeckout = true
            order.statusId = STATUS.PENDING
            await order.save()
            response.redirect('http://localhost:3000/history')
        }else{
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })
        }
      
        


    }
    Put = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const payload = await request.validateUsing(PostOrderForm)
        const order = await Order.find(id)
        if (!order) {
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })

        }
        order.name = payload.name
        order.address = payload.address
        order.phone = payload.phone || ""
        order.statusId = 1
        order.userId = payload.userid
        
        await order.save()

        return order

    }
    UpdateCart = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const payload = await request.validateUsing(PutOrderItemForm)
        const order = await Orderitem.find(id)
        if (!order) {
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })

        }
        order.quantity= payload.quantity
  
        
        await order.save()

        return order

    }
    Delete = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const order = await Order.find(id)
        if (!order) {
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })

        }
        await order.delete()

        return ['', 200]

    }
    DeleteCart = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const order = await Orderitem.find(id)
        if (!order) {
            return response.status(422).send({
                errors: [{
                    message: `order not found`
                }]
            })

        }
        await order.delete()

        return ['', 200]

    }
}