import Joi from 'joi'
import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: Number
}) 

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(course){
    const schema = Joi.object({
         name: Joi.string().min(3).required(), 
         phone: Joi.number().required(), 
         isGold: Joi.boolean(),
        })

    return schema.validate(course)
}

export {Customer, validateCustomer}