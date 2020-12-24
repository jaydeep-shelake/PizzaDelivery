const LocalStartegy = require('passport-local').Strategy
const User = require('../models/User');
const bcrypt = require('bcrypt');

 function initialize(passport){

passport.use(new LocalStartegy({usernameField:'email'},async(email,password,done)=>{
// check first if user already exits with email
const user=await User.findOne({email:email});//find the one user with spesific username i.e email
if(!user){  // if users dose not exits with same email id
 return done(null,false,{message:'No user with this email'}); // first is error which is null and user wich is not available hence it is false
}
bcrypt.compare(password,user.password) //checking if the password matches with enter password
.then(isMatch=>{
   if(isMatch){
       return done(null,user,{message:'Logged in successfully'})
   }
   else{
       return done(null,false,{message:'Password is incorrect'});
   }
})
.catch(err=>{
 console.log(err);
 return done(null,false,{message:'Something went wrong'});
});

}));
//storing data in session
passport.serializeUser((user,done)=>{
    done(null,user._id)
});

//recives whatever is stored in session
passport.deserializeUser((id,done)=>{
User.findById(id,(err,user)=>{
    done(err,user);
});
});
}

module.exports= initialize;