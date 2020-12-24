const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comments = new Schema({
    comment:{
       type:String,
       required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',   
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Comments',Comments);