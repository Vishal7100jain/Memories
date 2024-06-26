import express from 'express'
import { Create, GetPost, Delete, Update, UpdatePost, like, SearchPost, PostById, comment } from '../controller/post.js'
const router = express.Router()
import WrapAsync from '../utility/WrapAsync.js'
import authUser from '../middleware/Auth.js'

router.get("/Post", WrapAsync(GetPost))
router.post("/create", authUser, WrapAsync(Create))
router.delete("/delete/:id", authUser, WrapAsync(Delete))
router.get("/Update/:id", authUser, WrapAsync(Update))
router.patch("/Update", authUser, WrapAsync(UpdatePost))
router.patch("/like/:id", authUser, WrapAsync(like))
router.post("/Search", WrapAsync(SearchPost))
router.get("/post/:id", WrapAsync(PostById))
router.post("/post/comment/:id", authUser, WrapAsync(comment))

export default router