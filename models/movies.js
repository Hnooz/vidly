import Joi from 'joi'
import joiObjectId from 'joi-objectid'
import mongoose from 'mongoose'
import { genreSchema } from './genres.js'

const objectId = joiObjectId(Joi)
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type:genreSchema,
        required: true,
    },
    numberInStock: {
        type:Number,
        required:true,
        minlength: 0,
        maxlength: 255,
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        minlength: 0,
        maxlength: 255,
    }
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(request){
    const schema = Joi.object({
         title: Joi.string().required(),
         genreId: objectId().required(),
         numberInStock: Joi.number().required(),
         dailyRentalRate: Joi.number().required(),
        })

    return schema.validate(request)
}

export { Movie, validateMovie}
