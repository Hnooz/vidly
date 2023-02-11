import mongoose from 'mongoose'
import Fawn from 'fawn'

export default function connection(){

    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb://localhost/vidly-demo')
        .then(() => console.log('connected to mongodb'))
        .catch(err => console.error('could not connect to mongodb..', err))

    Fawn.init('mongodb://localhost/vidly-demo')
}