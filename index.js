const express = require('express')
const app = express()

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
]
app.get('/', (req, res) => {
    res.send('welcome to Vidly')
})
//GET:://
app.get('/api/genres', (req, res) => {
    res.send(genres)
})
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        res.status(404).send('ID is not present')
    } else {
        res.send(genre)
    }
})

const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`your app is listening ${port}`)
})