const express = require('express');
const bcrypt = require('bcrypt');
const registerRoute = express.Router();
const User = require('../models/User');
const verfiyUser = require('../auth/authenticate');

registerRoute.get('/',verfiyUser,(req,res)=>{
    res.render('auth/register');
});
registerRoute.post('/', async (req,res)=>{
    
    const {name,email,password} = req.body;
    //validate request 
    if(!name || !email || !password){
        req.flash('error','All flieds  are required');
        req.flash('name',name);
        req.flash('email',email);
        res.redirect('/register');
    }
   
    //Check if email exists
    User.exists({email:email},(err,result)=>{
        if(result){
            req.flash('error','This user already exits');
            req.flash('name',name);
            req.flash('email',email);
            res.redirect('/register');
        }
    });

    //hashing the the password
    const hashedPassword = await bcrypt.hash(password,10);
    //create a user
    const newUser = new User({name:name,email:email,password:hashedPassword});
    newUser.save().then(user=>{
        //automactically login the user after registeration
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
        req.flash('error','Something went wrong');
        res.redirect('/');
    })
    
    
});

module.exports=registerRoute;