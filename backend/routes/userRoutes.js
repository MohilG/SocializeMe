import express from "express";
import { followUnfollow, getSuggestedUsers, getUser, login, logout, signUp, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router=express.Router();
router.get('/profile/:query',getUser)
router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/suggested',protectRoute,getSuggestedUsers)  
router.post('/follow/:id',protectRoute,followUnfollow)  
router.put('/update/:id',protectRoute,updateUser)





export default router