require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const connectToDatabase = require("./databases/connection")
const cors = require("cors")
const { restaurantRoutes } = require('./routes')

const app = express()

connectToDatabase()
    .then(() => {
        console.log("Connected to database.")
    })
    .catch((error) => {
        console.error(error)
    })

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/restaurant", restaurantRoutes.restaurantRouter)

app.listen(3000, () => {
    console.log("Running...")
})