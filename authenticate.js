function verfiyUser(req,res,next){
    if(!req.isAuthenticated()){
        return next();  //if user is not logedin
    }
    return res.redirect('/');  // if user is loggedin
    }
    
    module.exports=verfiyUser;