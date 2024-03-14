import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import router from "./routes/posts.js";
dotenv.config()

const MONGO_URL = process.env.MONGO_URL
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true
})
    .then(res => app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    }))
    .catch(err => console.log(err))

app.use("/", router)

