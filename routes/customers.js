const express = require('express')
const customerRouter = express.Router()
const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Joi = require('joi')
const { required, number } = require('joi')
const { findById } = require('../models/genre')


//GET::
customerRouter.get('/', async (req, res) => {
    const customer = await Customer.find()
    console.log(customer)
    res.send(customer)
})
//GET[id]::
customerRouter.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer){
        res.status(404).send('ID is niot find')
        return
    }else{
        res.send(customer)
    }
})


//POST::
customerRouter.post('/',async(req,res) =>{
    const schema = Joi.object({
        name: Joi.string().min(3)
            .max(30)
            .required()
    })
    const {error} = validateGenres(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const customer = new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phoneNumber:req.body.phoneNumber
    })
    try{
        const result = await customer.save()
        res.send(result)
        console.log(result)
    }catch(ex){
        console.log('error',ex.message)
    }
})
//PUT::
customerRouter.put('/:id',async(req,res) => {
    // const genre = genres.find(c => c.id === parseInt(req.params.id))
    const customer = await Customer.findById(req.params.id)
     if(!customer){
         res.status(404).send('doc-id is not present.')
     }
     //validation
     const { error }  = validateGenres(req.body)
     if(error) {
      res.status(400).send(error.details[0].message)
      return;
  }
     //genre.name = req.body.name
     customer.set({
      name:req.body.name
     })
     const update = await customer.save()
     console.log(update)
     res.send(update)
  
  })
  
//DELETE::
customerRouter.delete('/:id',async(req,res) =>{
    //const genre = genres.find(c => c.id === parseInt(req.params.id))
   var customer = Customer.findById(req.params.id)
    if(!customer){
       res.status(400).send('ID is not present')
       return
    }
    /*const index = genres.indexOf(genre)
    genres.splice(index,1)*/
    var  customer = await Customer.deleteOne({_id:req.params.id})
    console.log(customer)
    res.send(customer)
 })

//validation//

function validateGenres(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        isGold:Joi.boolean().required(),
        phoneNumber:Joi.number().required()
    })
    return schema.validate(customer)
    
    }
module.exports = customerRouter;