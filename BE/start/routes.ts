/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import RolesController from '#controllers/roles_controller'
import UsersController from '#controllers/users_controller'




import StatusesController from '#controllers/statuses_controller'
import CategoriesController from '#controllers/categories_controller'
import ProductsController from '#controllers/products_controller'
import OrderitemsController from '#controllers/orderitems_controller'
import Orderitem from '#models/orderitem'
import OrdersController from '#controllers/orders_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.group(() => {
  router.group(() => {
    router.post('/login', [AuthController, 'Login'])
    router.post('/register', [AuthController, 'Register'])
    router.get('/profile', [AuthController, 'Profile']).use([middleware.auth()])
  }).prefix('/auth')
  router.group(() => {
    router.get('/', [RolesController, 'Get'])
  }).prefix('/role')
  router.group(() => {
    router.get('/', [UsersController, 'Get']).use([middleware.auth()])
    router.get('/mc', [UsersController, 'Getmc'])
    router.get('/:id', [UsersController, 'GetById'])
    router.post('/', [UsersController, 'Post'])
    router.put('/changepass/:id', [UsersController, 'Changepass'])
    router.put('/:id', [UsersController, 'Put'])
    router.delete('/:id', [UsersController, 'Delete'])
  }).prefix('/user')
  router.group(() => {

    router.get('/', [CategoriesController, 'Get']).use([middleware.auth()])
    router.get('/:id', [CategoriesController, 'GetById'])
    router.post('/', [CategoriesController, 'Post'])
    router.put('/:id', [CategoriesController, 'Put'])
    router.delete('/:id', [CategoriesController, 'Delete'])
  }).prefix('/categories')

  router.group(() => {
    router.get('/', [ProductsController, 'Get']).use([middleware.auth()])

    router.get('/:id', [ProductsController, 'GetById'])
   
    router.post('/', [ProductsController, 'Post'])
    router.put('/:id', [ProductsController, 'Put'])
    router.delete('/:id', [ProductsController, 'Delete'])
  }).prefix('/products')

  router.group(() => {
    router.get('/getcart', [OrdersController, 'GetCart']).use([middleware.auth()])
    router.get('/', [OrdersController, 'Get']).use([middleware.auth()])
    router.get('/:id', [OrdersController, 'GetById'])
    router.post('/addcart', [OrdersController, 'Additem']).use([middleware.auth()])
    router.post('/checkout', [OrdersController, 'Checkout']).use([middleware.auth()])
    router.post('/checkout/momo', [OrdersController, 'CheckoutMomo']).use([middleware.auth()])
    router.get('/checkout/momo/success', [OrdersController, 'MomoSuccess'])
    router.put('/:id', [ProductsController, 'Put'])
    router.put('updatecart/:id', [OrdersController, 'UpdateCart'])
    router.delete('/:id', [ProductsController, 'Delete'])
    router.delete('deletecart/:id', [OrdersController, 'DeleteCart'])
  }).prefix('/orders')
  router.group(() => {
    router.get('/', [StatusesController, 'Get'])
  }).prefix('/status')
 

}).prefix('/api')
