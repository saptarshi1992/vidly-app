const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const Genre = require('../models/genre')
const router = express.Router()


//GET::
router.get('/', async (req, res) => {
    const genre = await Genre.find()
    console.log(genre)
    res.send(genre)
})

//GET[:id]::
router.get('/:id', async(req, res) => {
    //const genre = genres.find(c => c.id === parseInt(req.params.id))
    const genre = await Genre.findById(req.params.id)
    if (!genre) {
        res.status(404).send('ID is not present')
        return
    } else {
        res.send(genre)
        console.log(genre)
    }
})
//POST::
router.post('/', async(req, res) => {
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
    const genre = new Genre({
        name:req.body.name
    })
    try{
        const result = await genre.save()
        res.send(result)
        console.log(result)
    }catch(ex){
        console.log('error',ex.message)
    }
    //for testing //
    /*const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)*/
})
//PUT::
router.put('/:id',async(req,res) => {
  // const genre = genres.find(c => c.id === parseInt(req.params.id))
  const genre = await Genre.findById(req.params.id)
   if(!genre){
       res.status(404).send('doc-id is not present.')
   }
   //validation
   const { error }  = validateGenres(req.body)
   if(error) {
    res.status(400).send(error.details[0].message)
    return;
}
   //genre.name = req.body.name
   genre.set({
    name:req.body.name
   })
   const update = await genre.save()
   console.log(update)
   res.send(update)

})


//DELETE::
router.delete('/:id',async(req,res) =>{
   //const genre = genres.find(c => c.id === parseInt(req.params.id))
  var genre = Genre.findById(req.params.id)
   if(!genre){
      res.status(400).send('ID is not present')
      return
   }
   /*const index = genres.indexOf(genre)
   genres.splice(index,1)*/
   var  genre = await Genre.deleteOne({_id:req.params.id})
   console.log(genre)
   res.send(genre)
})

//validation::

function validateGenres(genre){
const schema = Joi.object({
    name:Joi.string().min(3).max(100).required()
})
return schema.validate(genre)

}

module.exports = router;