import express from "express";
import {createPost, deletePost, getFeed, getPost, getUserPost, likeUnlike, replyPost} from '../controllers/postController.js'
import protectRoute from "../middlewares/protectRoutes.js";
const router=express.Router()

router.get('/:postId',getPost)
router.get('/',protectRoute,getFeed)
router.get('/user/:username',protectRoute,getUserPost)
router.post('/create',protectRoute,createPost)
router.delete('/:postId',protectRoute,deletePost)
router.put('/like/:postId',protectRoute,likeUnlike)
router.put('/reply/:postId',protectRoute,replyPost)



export default router