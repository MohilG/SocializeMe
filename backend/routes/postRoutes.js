import express from "express";
import {createPost, deletePost, getFeed, getPost, likeUnlike, replyPost} from '../controllers/postController.js'
import protectRoute from "../middlewares/protectRoutes.js";
const router=express.Router()

router.get('/:postId',getPost)
router.get('/',protectRoute,getFeed)
router.post('/create',protectRoute,createPost)
router.delete('/:postId',protectRoute,deletePost)
router.post('/like/:postId',protectRoute,likeUnlike)
router.post('/reply/:postId',protectRoute,replyPost)



export default router