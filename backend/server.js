
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config()

connectDB()

const app = express()

//Body Parser
app.use(express.json())

//Message sent to the Client
app.get('/', (req, res) => {
    res.send('API is running...')
})

//Mount productRoutes
app.use('/api/products', productRoutes)

//Mount userRoutes
app.use('/api/users', userRoutes)

//Mount orderRoutes
app.use('/api/orders', orderRoutes)

//PayPal Route:
// app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//Custom Error Middlware calls:
app.use(notFound)
app.use(errorHandler)

//Environment Variables Implementation:
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

