/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Api
Route.group(() => {
  //v1
  Route.group(() => {
    //Public Routes
    Route.get('/system/status', 'SystemsController.status')
    Route.post('/login', 'AuthController.login')
    Route.post('/register/client', 'AuthController.registerClient')
    Route.post('/register/store', 'AuthController.registerStore')
    Route.post('/store/email-exists', 'StoresController.emailExists')

    //Authenticated Routes
    Route.group(() => {
      Route.resource('user', 'UsersController').except(['store']).apiOnly()
      Route.get('/me', 'UsersController.showLoggedUser')
      Route.post('/user/attach-image', 'UsersController.attachImage')
      Route.post('/user/image', 'UsersController.changeImage')

      Route.resource('promotion', 'PromotionsController').apiOnly()

      Route.get('/vouchers', 'VoucherController.index')
      Route.get('/vouchers/:id', 'VoucherController.show')

      // Only Stores
      Route.group(() => {
        //Promotion
        Route.post('/promotion/attach-image', 'PromotionsController.attachImage')
        Route.get('/tags', 'TagsController.index')
      }).middleware('storeRoutes')

      // Only App mobile Clients
      Route.group(() => {
        Route.get('/store', 'StoresController.index')

        Route.post('/client/add-voucher', 'ClientsController.addVoucher')
        // Route.get('/vouchers', 'ClientsController.loadMyVouchers')

        Route.get('/highlight-promotions', 'ClientsController.loadHighlightPromotions')
        Route.get('/popular-promotions', 'ClientsController.loadPopularPromotions')
        Route.get('/explore-promotions', 'ClientsController.loadExplorePromotions')
        Route.get('/store-promotion/:id', 'ClientsController.loadPromotionByStore')
      }).middleware('clientRoutes')
    }).middleware('auth')
  }).prefix('v1')
}).prefix('api')
