const express = require('express');
const homeRoute = express.Router();
const  Menu = require('../models/Menu');

homeRoute.get('', async(req,res)=>{
    const Allpizzas = await Menu.find({});
    res.render('home',{Allpizzas:Allpizzas});
});
homeRoute.get('/:id', async (req,res)=>{
    const pizza = await Menu.findById(req.params.id);
    res.render('customer/singlePizza',{pizza:pizza});
});
module.exports=homeRoute;