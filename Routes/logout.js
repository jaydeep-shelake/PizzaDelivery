const express = require('express');
const logoutRoute = express.Router();

logoutRoute.get('/',(req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports= logoutRoute;