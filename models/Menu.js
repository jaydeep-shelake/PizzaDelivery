const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Menu = new Schema({
name:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
},
size:{
    type:String,
    required:true 
}
});

module.exports=mongoose.model('Menu',Menu);