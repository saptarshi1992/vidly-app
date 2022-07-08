const express = require('express')
const mongoose = require('mongoose')
//mongodb connection//
mongoose.connect('mongodb://0.0.0.0:27017/vidly-1')
.then(()=> console.log('MongoDB database connected'))
.catch((err)=> console.log('database connection error',err))

//create schema//
const createSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        lowercase:true,
        trim:true
    }
})

//compiles model()//
const Genre = mongoose.model('Genres', createSchema)
module.exports = Genre