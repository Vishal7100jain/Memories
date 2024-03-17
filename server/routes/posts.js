import express from 'express'
import { Create, GetPost, Delete, Update, UpdatePost, like } from '../controller/post.js'
const router = express.Router()
import WrapAsync from '../utility/WrapAsync.js'

router.get("/Post", WrapAsync(GetPost))
router.post("/create", WrapAsync(Create))
router.delete("/delete/:id", WrapAsync(Delete))
router.get("/Update/:id", WrapAsync(Update))
router.patch("/Update", WrapAsync(UpdatePost))
router.patch("/like/:id", WrapAsync(like))

export default router