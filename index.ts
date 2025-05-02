import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import userRouter from './src/routes/user'
import examSessionRouter from "./src/routes/examSessionRouter";

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/admin', userRouter)
app.use('/examSession', examSessionRouter)

app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})