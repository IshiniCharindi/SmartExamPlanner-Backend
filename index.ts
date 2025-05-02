import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser';

import userRouter from './src/routes/user'
import examSessionRouter from "./src/routes/examSessionRouter";
import departmentRouter from "./src/routes/department";
import lectureRouter from "./src/routes/lecturer";
import facultyRouter from "./src/routes/faculty";
import examHallRouter from "./src/routes/examHall";

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

app.use(cookieParser());
app.use('/admin', userRouter)
app.use('/examSession', examSessionRouter)
app.use('/department', departmentRouter)
app.use('/lecturer', lectureRouter)
app.use('/faculty',facultyRouter)
app.use('/examHall',examHallRouter)

app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})