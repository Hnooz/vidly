import express from 'express'
import users from '../routes/users.js'
import auth from '../routes/auth.js'
import rentals from '../routes/rentals.js'
import genres from '../routes/genres.js'
import customers from '../routes/customers.js'
import movies from '../routes/movies.js'

const app = express()

function appRoute(){
    app.use(express.json())
    app.use('/api/users', users)
    app.use('/api/login', auth)
    app.use('/api/genres', genres)
    app.use('/api/rentals', rentals)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
}

export { appRoute, app }