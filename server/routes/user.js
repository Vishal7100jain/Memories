import express from "express";
const router = express.Router()
import { signIn, signUp, googleLogin } from '../controller/user.js'
import WrapAsync from "../utility/WrapAsync.js";

router.post('/SignIn', WrapAsync(signIn))
router.post('/SignUp', WrapAsync(signUp))
router.post("/google/login", WrapAsync(googleLogin))

export default router