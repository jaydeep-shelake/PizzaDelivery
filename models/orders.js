const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
 cosusterId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
 },
 items:{
   type:Object,
   required:true,
 },
 paymentType:{
     type:String,
     default:'COD'
 },
 status:{
     type:String,
     default:'Order_placed'
 }
},{timestamps:true});

module.exports = mongoose.model('Order',Order);