
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

//Message sent to the Client
app.get('/', (req, res) => {
    res.send('API is running...')
})

//API Route for ALL Products
app.get('/api/products', (req, res) => {
    res.json(products)
})

//API Route for ONE Product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

//Environment Variables Implementation:
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

