require("dotenv").config()
require('express-async-errors') // creates an async wrapper for all async functions

const express = require("express")
const app = express();

const connectDB = require('./db/connect')
// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>')
})


//routes
const productsRouter = require('./routes/products.routes')
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5001
const start = async () => {
    try {
        // @TODO connect to DB
        await connectDB(process.env.MONGO_URI)
        // Spin up the server
        app.listen(PORT, () => {
            console.log(`connected to DB.Listening on port ${PORT}`)
        })
    } catch (e) {
        console.log('Unable to Start the server...')
    }
} // end start

start();