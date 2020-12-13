const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const app = express();

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
app.get('/',(req,res)=>{
 res.render('home');
});

app.listen(port,(   	

)=>{
console.log(`your server is running on http://localhost:${port}`);
});

