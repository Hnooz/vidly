import Joi from 'joi'
import mongoose from 'mongoose'

const genreSchema = mongoose.Schema({
    name : String,
}) 

const Genre = mongoose.model('Genre', genreSchema)

function validateGenre(course){
    const schema = Joi.object({ name: Joi.string().min(3).required() })

    return schema.validate(course)
}

export { Genre, validateGenre, genreSchema}