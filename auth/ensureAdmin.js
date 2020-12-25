function verifyAdmin(req,res,next){
 if(req.isAuthenticated() && req.user.role==="Admin"){
     return next();
 }
 return res.redirect('/');
}
module.exports=verifyAdmin;