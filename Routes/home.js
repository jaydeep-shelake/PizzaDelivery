const express = require('express');
const homeRoute = express.Router();

homeRoute.get('',(req,res)=>{
    res.render('home');
});

module.exports=homeRoute;