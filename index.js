const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const app = express()
const router = require('./routes/genres');
const customerRouter = require('./routes/customers');
app.set('view engine','pug')
app.set('views','./views')

app.use(express.json());

app.get('/', (req, res) => {
    //res.send('welcome to Vidly')
    res.render('index',{newtitle :'This is vidly,a movie app',message:'welcome to vidly'})
})

app.use('/api/genres',router)
app.use('/api/customer',customerRouter)



//set env varibale for port
const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`your app is listening ${port}`)
})