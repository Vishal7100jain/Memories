import express from 'express'
import { Create, GetPost, Delete } from '../controller/post.js'
const router = express.Router()
import WrapAsync from '../utility/WrapAsync.js'

router.get("/Post", WrapAsync(GetPost))
router.post("/create", WrapAsync(Create))
router.delete("/delete/:id", WrapAsync(Delete))



export default router