import express from "express";
import { followUnfollow, login, logout, signUp } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router=express.Router();

router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/follow/:id',protectRoute,followUnfollow)




export default router