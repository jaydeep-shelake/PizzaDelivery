const express = require('express');
const registerRoute = express.Router();

registerRoute.get('/',(req,res)=>{
    res.render('auth/register');
});

module.exports=registerRoute;