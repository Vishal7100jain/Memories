import express from 'express'
import { Create, GetPost } from '../controller/post.js'
const router = express.Router()
import WrapAsync from '../utility/WrapAsync.js'

router.get("/Post", WrapAsync(GetPost))
router.post("/create", WrapAsync(Create))



export default router