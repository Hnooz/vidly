import { Customer, validateCustomer} from '../models/customer.js'
import Router  from 'express'
const router = Router()



router.get('/', async (req, res) => {
    const customers = await Customer.find()

    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send('the customer with the given id was not found')

    res.send(customer)
})

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({ 
        name: req.body.name, 
        phone: req.body.phone,
        isGold: req.body.isGold,
    })
    
    try {
        const result = await customer.save()
        res.send(result)        
    } catch (error) {
        res.send(error) 
    }
})

router.put('/:id', async(req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }, {
        new: true
    })
    if (!customer) return res.status(404).send('the customer with the given id was not found')

    res.send(customer)
})

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send('the customer with the given id was not found')
    res.send(customer)
})

export default router 