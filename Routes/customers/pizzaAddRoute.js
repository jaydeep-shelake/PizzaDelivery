const express = require('express');
const addPizzaRoute = express.Router();
const Menu = require('../../models/Menu');
const verifyAdmin = require('../../auth/ensureAdmin');
addPizzaRoute.get('/',verifyAdmin,(req,res)=>{
    res.render('customer/addPizza.ejs');
});

addPizzaRoute.post('/', verifyAdmin,(req,res)=>{
    
    const newPizza = new Menu(req.body);
    newPizza.save()
    .then(()=>{
        console.log(req.body);
        res.json(req.body)
    }).catch(err=> console.log(err));
    
});



module.exports=addPizzaRoute;