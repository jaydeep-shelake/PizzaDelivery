const express = require('express');
const  Passport  = require('passport');
const loginRoute = express.Router();
const verfiyUser = require('../auth/authenticate');


const _getRedirectUrl =(request)=>{
  return request.user.role==="Admin" ? '/admin':'/orders'
   }

loginRoute.get('/',verfiyUser,(req,res)=>{
    res.render('auth/login');
});
loginRoute.post('/',(req,res,next)=>{
  
  const {name,email,password} = req.body;
    //validate request 
    if( !email || !password){
        req.flash('error','All flieds  are required');
        res.redirect('/login');
    }

   Passport.authenticate('local',(err,user,msg)=>{
     if(err){
         req.flash('error',msg.message);
         return next(err)
     }
     if(!user){
        req.flash('error',msg.message);
        return res.redirect('/login');
     }

     req.logIn(user,(err)=>{
      if(err){
        req.flash('error',msg.message);
        return next(err)
      }
      //if customer is logged in then redirect to home page else admin is logged in redirect to /admin

      return res.redirect(_getRedirectUrl(req));
     })
   })(req,res,next);
});
module.exports=loginRoute;