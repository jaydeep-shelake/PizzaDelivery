function ensureUser(req,res,next){
    if(req.isAuthenticated()){
        return next();  //if user is not logedin
    }
    return res.redirect('/login');  // if user is loggedin
    }
   
 module.exports=ensureUser;