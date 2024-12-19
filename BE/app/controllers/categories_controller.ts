
import { PostCategoryForm } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

import Category from '#models/category';

export default class CategoriesController {
    Get = async ({ request, response, auth }: HttpContext) => {
        let category = await Category.query().preload('products',x=>x.preload('category'))

        // const payload = request.qs()

        // if(payload.academicyearid!== 'undefined'&&payload.academicyearid){
        //     faculty.preload('contribution',z=>z.preload('deadline',m=>m.preload('submission')).where('academicyear_id',payload.academicyearid))
        // }
        // if(!payload.academicyearid){
        //     faculty.preload('contribution',z=>z.preload('deadline',m=>m.preload('submission')))
        // }
    
 
        return response.send(category)
    }

    GetById = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        let category = await Category.query().where('id', id).preload('products').first()
        return response.send(category)
    }
    Post = async ({ response, request }: HttpContext) => {
        const payload = await request.validateUsing(PostCategoryForm)

        let oldCategory=  await Category.findBy('name',payload.name)
        if(oldCategory){
            return response.status(422).send({
                errors:[{
                    message:`category is not same name`
                }]
            })
        }
        const category = new Category()
        category.name = payload.name
        category.description = payload.description

        await category.save()

        return category

    }

    Put = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const payload = await request.validateUsing(PostCategoryForm)
        const category = await Category.find(id)
        if (!category) {
            return response.status(422).send({
                errors:[{
                    message:`category not found`
                }]
            })
         
        }
   
     
        category.name = payload.name
        category.description = payload.description

        await category.save()
        return category

    }
    Delete = async ({ response, request }: HttpContext) => {
        const id = request.param('id')
        const category = await Category.find(id)
        if (!category) {
            return response.status(422).send({
                errors:[{
                    message:`Faculty not found`
                }]
            })
           
        }
        await category.delete()

        return ['', 200]

    }
}