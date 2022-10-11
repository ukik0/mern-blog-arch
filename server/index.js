import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'

import AuthRouter from './Routes/auth.js'
import PostsRouter from "./Routes/posts.js";
import TagsRouter from "./Routes/tags.js";

import {checkAuth} from "./utils/checkAuth.js";

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
app.use('/uploads', express.static('uploads'))

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cnml8oe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('DB Ok'))
    .catch((err) => console.log(err))


app.listen(PORT, () => console.log(`Server start on Port ${PORT}`))
app.get("/", (req, res) => res.send('Ok'))


//Routes
app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)
app.use('/api/tags', TagsRouter)

//Multer
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

app.post('/api/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.status(200).json({url: `/uploads/${req.file.originalname}`})
})



