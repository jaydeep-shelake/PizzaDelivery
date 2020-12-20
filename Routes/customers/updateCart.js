const express = require('express');
const updateCartRoute = express.Router();

updateCartRoute.post('/',(req,res)=>{
    // let cart ={
    //     items:{pizzaId:{item:pizzaObject,qty:0},},
    //     totalQty:0,
    //     totalPrice:0
    // }


    //for the first creating cart session  and adding basic object stucture
    if(!req.session.cart){
       req.session.cart = {
        items:{},
        totalQty:0,
        totalPrice:0
       }  
    }
    let cart = req.session.cart;
    
       //check if item dose not exits in cart
       if(!cart.items[req.body._id]){
          cart.items[req.body._id]={
              item:req.body,
              qty:1, // if user is adding pizza for first time means quantity will be one
          }
          cart.totalQty=cart.totalQty+1;
          cart.totalPrice= cart.totalPrice+ req.body.price;
       }
       else{
           // if pizza exist already
           cart.items[req.body._id].qty+=1;
           cart.totalQty+=1;
           cart.totalPrice+=req.body.price;
       }
    return res.json({totalQty: req.session.cart.totalQty});
});


module.exports=updateCartRoute;