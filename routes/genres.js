import auth from '../middleware/auth.js'
import { Genre, validateGenre } from '../models/genres.js'
import Router  from 'express'
import admin from '../middleware/admin.js'
const router = Router()

router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name')
    res.send(genre)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('the genre with the given id was not found')

    res.send(genre)
})

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name })
    
    try {
        const result = await genre.save()
        res.send(result)        
    } catch (error) {
        res.send(error) 
    }
})

router.put('/:id', auth, async(req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if (!genre) return res.status(404).send('the genre with the given id was not found')

    res.send(genre)
})

router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('the genre with the given id was not found')
    res.send(genre)
})

export default router 