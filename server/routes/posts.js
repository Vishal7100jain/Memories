import express from 'express'
import { Create, GetPost } from '../controller/post.js'
const router = express.Router()

router.get("/", GetPost)
router.get("/Create", Create)



export default router