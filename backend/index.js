import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from './routes/userRoutes.js'
dotenv.config()
const app=express()
const PORT= 4000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/users',userRoutes)
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})