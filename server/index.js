import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import PostRoute from "./routes/posts.js";
import UserRoute from './routes/user.js'
import User from "./models/user.js";

dotenv.config()

const MONGO_URL = process.env.MONGO_URL
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_URL)
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    }))
    .catch(err => console.log(err))

app.use("/", PostRoute)
app.use("/User", UserRoute)

// User.deleteMany({}).then(res => console.log(res))
// User.find({}).then(res => console.log(res))


