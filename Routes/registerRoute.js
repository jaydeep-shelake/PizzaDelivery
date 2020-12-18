const express = require('express');
const registerRoute = express.Router();

registerRoute.get('/',(req,res)=>{
    res.render('auth/register');
});
registerRoute.post('/',(req,res)=>{
    console.log(req.body);
    res.render('home');
});

module.exports=registerRoute;