const express = require('express');
const adminRoute = express.Router();
const Orders= require('../../models/orders');
const moment = require('moment');
const verifyAdmin = require('../../auth/ensureAdmin');
adminRoute.get('/',verifyAdmin,(req,res)=>{
  Orders.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('cosusterId', '-password').exec((err, orders) => {
    if(req.xhr) {
        return res.json(orders)
    } else {
     return res.render('admin/order')
    }
})

});

module.exports=adminRoute;