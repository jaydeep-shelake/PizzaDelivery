const express = require('express');
const addPizzaRoute = express.Router();
const Menu = require('../../models/Menu');
addPizzaRoute.get('/',(req,res)=>{
    res.render('customer/addPizza.ejs');
});

addPizzaRoute.post('/', (req,res)=>{
    
    const newPizza = new Menu(req.body);
    newPizza.save()
    .then(()=>{
        console.log(req.body);
        res.json(req.body)
    }).catch(err=> console.log(err));
    
});



module.exports=addPizzaRoute;