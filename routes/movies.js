import { Movie, validateMovie } from '../models/movies.js'
import { Genre } from '../models/genres.js'
import Router  from 'express'
const router = Router()

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title')
    res.send(movie)
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).send('the movie with the given id was not found')

    res.send(movie)
})

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('Invalid genre.')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    })
    
    try {
        movie = await movie.save()
        res.send(movie)        
    } catch (error) {
        res.send(error) 
    }
})

router.put('/:id', async(req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('Invalid genre.')
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id.toString(),
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,

    }, {new: true})
    if (!movie) return res.status(404).send('the movie with the given id was not found')

    res.send(movie)
})

router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send('the movie with the given id was not found')
    res.send(movie)
})

export default router 