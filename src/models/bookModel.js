const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    bookID:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publicher:{
       type:String,
       required:true
    },
    price:{
        type:Number,
        required:true
    },

},{
    timestamps:true
});

module.exports = mongoose.model("Book", bookSchema);
bookSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});

