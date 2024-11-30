import Product from '#models/product'
import User from '#models/user';
import {  PostProductForm, PutProductForm } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers';

import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app';


import fs from "fs"
import JSZip from "jszip";
export default class ProductsController {
    Get = async ({ request,response, auth }: HttpContext) => {
        const payload = request.qs()
        let product = Product.query().preload('category')
        
        if(payload.categoryid!== 'undefined' && payload.categoryid){
            product.where('category_id', payload.categoryid)
    
        }
       
    
        if(payload.page!== 'undefined' && payload.page){
            product.paginate(payload.page, 5)
    
        }
        let product1 = await product

        return response.send(product1)
    }


    GetById = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        let product = await Product.query().preload('category').first()
        return response.send(product)
    }
    GetBycateId = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        let product = await Product.query().preload('category', (x) => x.where('id', id))
        return response.send(product)
    }
    Post = async ({ response, request, auth }: HttpContext) => {
        const payload = await request.validateUsing(PostProductForm)
        const product = new Product()
        product.description = payload.description || ""
        product.name = payload.name
        product.categoryId = payload.categoryid
        product.price = payload.price
      
        await payload.image.move(app.makePath('public/uploads'))
        let filename = (payload.image.fileName||"")

        product.image = "uploads/"+filename
        await product.save()
        return product
    }
    Put = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const payload = await request.validateUsing(PutProductForm)
        const product = await Product.find(id)
        if (!product) {
            return response.status(422).send({
                errors: [{
                    message: `product not found`
                }]
            })

        }
        product.name = payload.name
        product.categoryId = payload.categoryid
        product.description = payload.description || ""
        product.price = payload.price
        
        if(payload.image){
            await payload.image.move(app.makePath('public/uploads'))
            let filename = (payload.image.fileName||"")
    
            product.image = "uploads/"+filename
        }
     
        await product.save()

        return product

    }
    Delete = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const product = await Product.find(id)
        if (!product) {
            return response.status(422).send({
                errors: [{
                    message: `product not found`
                }]
            })

        }
        await product.delete()

        return ['', 200]

    }
}