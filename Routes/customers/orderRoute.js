const express = require('express');
const orderRoute = express.Router();
const Order = require('../../models/orders');
const ensureUser = require('../../auth/ensureUser')
const moment = require('moment');
orderRoute.get('/',ensureUser,async(req,res)=>{
  // loged user oredr fectching from the database
  const orders = await Order.find({cosusterId:req.user._id});
  res.header('Cache-Control','no-cache','private','no-store','must-revalidate','max-stale=0','post-check=0','pre-check=0');
  res.render('customer/orders',{orders:orders,moment:moment});
  
});

orderRoute.post('/',ensureUser,(req,res)=>{
    //valid request
    
    const newOrders = new Order({cosusterId:req.user._id,items:req.session.cart.items})
    newOrders.save()
    .then(result=>{
      Order.populate(result,{path:'cosusterId'},(err,placedOrder)=>{
        req.flash('success','Order succesfully placed');
     //deleting all the items from the cart after its order
     delete req.session.cart;
     //Emit 
     const eventEmitter = req.app.get('eventEmitter');
     eventEmitter.emit('orderPlaced',placedOrder);

     res.redirect('/orders');
      })
     
     
    })
    .catch(err=>{
        console.log(err);
        req.flash('error','Something went wrong');
        res.redirect('/cart');
    })
});

orderRoute.get('/:id',async(req,res)=>{
  const order= await Order.findById(req.params.id);
  //Authorize user status only visible for logged in user of its own order
  if(req.user._id.toString() === order.cosusterId.toString()){
   return res.render('customer/singleOrdere',{order:order});
  }
  
   return res.redirect('/');
  

});

module.exports=orderRoute;