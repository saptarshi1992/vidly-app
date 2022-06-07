const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
]
app.get('/', (req, res) => {
    res.send('welcome to Vidly')
})
//GET::
app.get('/api/genres', (req, res) => {
    res.send(genres)
})
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        res.status(404).send('ID is not present')
        return
    } else {
        res.send(genre)
    }
})
//POST::
app.post('/api/genres', (req, res) => {
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

app.put('/api/genres/:id',(req,res) => {
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
app.delete('/api/genres/:id',(req,res) =>{
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

//set env varibale for port
const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`your app is listening ${port}`)
})