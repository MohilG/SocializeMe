import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import {v2 as cloudinary} from "cloudinary"
dotenv.config()
const app=express()
const PORT= 4000 || process.env.PORT
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})