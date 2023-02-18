
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js';

dotenv.config()

connectDB()

const app = express()

//Message sent to the Client
app.get('/', (req, res) => {
    res.send('API is running...')
})

//Mount productRoutes
app.use('/api/products', productRoutes)

//Custom Error Middlware calls:
app.use(notFound)
app.use(errorHandler)

//Environment Variables Implementation:
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

