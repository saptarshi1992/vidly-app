const express = require('express')
const mongoose = require('mongoose')

//mongodb connect//
mongoose.connect('mongodb://0.0.0.0:27017/vidly-1')
.then(()=>{console.log('connect with mongodb database')})
.catch((ex)=>{console.log('mongodb connection error',ex)})
//create schema//
const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
        trim:true
    },
    isGold:{
        type:Boolean,
        required:true
    },
    phoneNumber:{
        type: Number,
        required:true,
    }
})
//compile model//
const Customer = new mongoose.model('customer',customerSchema)
module.exports = Customer;