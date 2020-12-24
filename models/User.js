const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
 name:{
     type:String,
     required:true
 },
 email:{
     type:String,
     required:true,
     unique:true
 },
 password:{
     type:String,
     required:true,
 },
 role:{  // two roles in application one is user and another is admin
    type:String,
    default:'customer',
 }
},{timestamps:true});

module.exports = mongoose.model('User',User);