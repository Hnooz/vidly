import config from 'config'
import mongoose from 'mongoose'
import express from 'express'
import users from './routes/users.js'
import auth from './routes/auth.js'
import rentals from './routes/rentals.js'
import genres from './routes/genres.js'
import customers from './routes/customers.js'
import movies from './routes/movies.js'
import Fawn from 'fawn'
const app = express()

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/vidly-demo')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to mongodb..', err))
 
Fawn.init('mongodb://localhost/vidly-demo')
app.use(express.json())
app.use('/api/users', users)
app.use('/api/login', auth)
app.use('/api/genres', genres)
app.use('/api/rentals', rentals)
app.use('/api/customers', customers)
app.use('/api/movies', movies)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`)) 