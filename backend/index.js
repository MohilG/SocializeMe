import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import {v2 as cloudinary} from "cloudinary"
import path from 'path'
dotenv.config()
const app=express()
const PORT= 4000 || process.env.PORT
const __dirname=path.resolve()
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

// if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))
  app.get("*", (req,res)=>{
      res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})
// }
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})