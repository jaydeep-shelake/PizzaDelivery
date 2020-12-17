const express = require('express');
const loginRoute = express.Router();

loginRoute.get('/',(req,res)=>{
    res.render('auth/login');
});

module.exports=loginRoute;