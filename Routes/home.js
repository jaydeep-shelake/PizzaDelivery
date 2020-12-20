const express = require('express');
const homeRoute = express.Router();
const  Menu = require('../models/Menu');

homeRoute.get('', async(req,res)=>{
    const Allpizzas = await Menu.find({});
    res.render('home',{Allpizzas:Allpizzas});
});

module.exports=homeRoute;