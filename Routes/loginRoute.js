const express = require('express');
const  Passport  = require('passport');
const loginRoute = express.Router();
const verfiyUser = require('../authenticate');

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
      return res.redirect('/');
     })
   })(req,res,next);
});
module.exports=loginRoute;