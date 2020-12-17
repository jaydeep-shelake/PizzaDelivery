const express = require('express');
const cartRoute = express.Router();

cartRoute.get('/',(req,res)=>{
    res.render('customer/cart')
});

module.exports=cartRoute;