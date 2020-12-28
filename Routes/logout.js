const express = require('express');
const logoutRoute = express.Router();

logoutRoute.post('/',(req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports= logoutRoute;