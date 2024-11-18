import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()
const port = process.env.PORT
const MONGO_URL=process.env.mongo_URI

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.Frontend_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));


app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}))


try {
  mongoose.connect(MONGO_URL)
  console.log("Connected to mongodb")
} catch (error) {
  console.log(error)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)

  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,// Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})