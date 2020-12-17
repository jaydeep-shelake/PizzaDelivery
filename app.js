const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const app = express();
const homeRoute = require('./Routes/home');
const cartRote = require('./Routes/cartRoute');
const loginRoute=require('./Routes/loginRoute');
const registerRoute = require('./Routes/registerRoute');
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

//routes
app.use('/',homeRoute);
app.use('/cart',cartRote);
app.use('/login',loginRoute);
app.use('/register',registerRoute);

app.listen(port,(   	

)=>{
console.log(`your server is running on http://localhost:${port}`);
});

