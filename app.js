if(process.env.NODE_EVN !=='production'){
    require('dotenv').config();

}

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBstore = require('connect-mongo')(session);
const passport = require('passport');
const port = process.env.PORT || 3000;
const app = express();
const homeRoute = require('./Routes/home');
const cartRote = require('./Routes/customers/cartRoute');
const loginRoute=require('./Routes/loginRoute');
const registerRoute = require('./Routes/registerRoute');
const addPizzaRoute = require('./Routes/customers/pizzaAddRoute');
const updateCartRoute = require('./Routes/customers/updateCart');
const logoutRoute = require('./Routes/logout');
const uri = 'mongodb://localhost:27017/pizza';
const connect = mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
.then(()=>console.log('connected..'))
.catch(err=>console.log(err));

//files
const views = path.join(__dirname, './views');
const public = path.join(__dirname,'./public');
//bodyParser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//set tempalte engine
app.set('views',views);
app.set('view engine','ejs');
app.set('layout','layout/layout');
app.use(expressLayout);

// public
app.use(express.static(public));




//session store
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store: new MongoDBstore({mongooseConnection:mongoose.connection,collection:'sessions'}),
    cookie:{maxAge:1000*60*60*24} //24hours(due to it take time in milisecond)
}));

//passport
const passportIniyialize = require('./config/passport');
passportIniyialize(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global variables
app.use((req,res,next)=>{
res.locals.session=req.session;
res.locals.user = req.user;

next();
})



//routes

app.use('/cart',cartRote);
app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/addPizza',addPizzaRoute);
app.use('/update-cart',updateCartRoute);
app.use('/logout',logoutRoute);
app.use('/',homeRoute);
app.listen(port,()=>{
console.log(`your server is running on http://localhost:${port}`);
});

