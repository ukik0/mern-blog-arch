import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

//Dotenv
const PORT = process.env.PORT || 8000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


//Middlewares
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cnml8oe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('DB Ok'))
    .catch((err) => console.log(err))


app.listen(PORT, () => console.log(`Server start on Port ${PORT}`))
app.get("/", (req, res) => res.send('Ok'))


//Routes
