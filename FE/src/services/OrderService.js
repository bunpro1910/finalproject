import instance from "@/data/Instance"
import axios from "axios"

export default  {
    getOrder : ()=> instance.get('/orders') ,
    getCart : ()=> instance.get('/orders/getcart') ,
    createOrder  : (formdata)=> instance.post('/orders',formdata) ,
    addCart  : (formdata)=> instance.post('/orders/addcart',formdata) ,
    checkOut  : (formdata)=> instance.post('/orders/checkout',formdata) ,
    checkOutmomo  : (formdata)=> instance.post('/orders/checkout/momo',formdata) ,
    updateOrder : (id,formdata)=> instance.put(`/orders/${id}`,formdata) ,
    deleteOrder  : (id)=> instance.delete(`/orders/${id}`) ,
    updatecart  : (id,formdata)=> instance.put(`/orders/updatecart/${id}`,formdata) ,
    deleteCart  : (id)=> instance.delete(`/orders/deletecart/${id}`) ,
    getOrderById : (id)=> instance.get(`/orders/${id}`) ,
    gettinhthanh : () =>  axios.get(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`)
}