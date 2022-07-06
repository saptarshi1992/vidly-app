const express = require('express')
const Joi = require('joi')
const router = express.Router()
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
] 

//GET::
router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        res.status(404).send('ID is not present')
        return
    } else {
        res.send(genre)
    }
})
//POST::
router.post('/', (req, res) => {
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
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})
//PUT::

router.put('/:id',(req,res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id))
   if(!genre){
       res.status(404).send('doc-id is not present.')
   }
   //validation
   const { error }  = validateGenres(req.body)
   if(error) {
    res.status(400).send(error.details[0].message)
    return;
}
   genre.name = req.body.name
   res.send(genre)

})


//DELETE::
router.delete('/:id',(req,res) =>{
   const genre = genres.find(c => c.id === parseInt(req.params.id))
   if(!genre){
      res.status(400).send('ID is not present')
      return
   }
   const index = genres.indexOf(genre)
   genres.splice(index,1)
   res.send(genres)
})

//validation::

function validateGenres(genre){
const schema = Joi.object({
    name:Joi.string().min(3).max(100).required()
})
return schema.validate(genre)

}

module.exports = router;