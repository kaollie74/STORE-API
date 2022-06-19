require("dotenv").config();
require("express-async-errors"); // creates an async wrapper for all async functions
const connectDB = require("./db/connect");

// configure express
const express = require("express");
const app = express();

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
app.use(express.json());

// ROUTES
const productsRouter = require("./routes/products.routes");
app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware); // ROUTE NOT FOUND
app.use(errorMiddleware); // ERROR DURING THE REQUEST

const PORT = process.env.PORT || 5001;
const start = async () => {
    try {
        // let's connec to DB before starting server
        await connectDB(process.env.MONGO_URI);
        // Spin up the server
        app.listen(PORT, () => {
            console.log(`connected to DB.Listening on port ${PORT}`);
        });
    } catch (e) {
        console.log("Unable to Start the server...");
    }
}; // end start

start();
