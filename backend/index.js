
import express from "express"

import path from 'path'



import connectionDb from './connection.js'
import staticRouter from './routes/staticroutes.js'
import userRouter from './routes/userroutes.js'
import mainRouter from './routes/mainroutes.js'
import postRouter from './routes/postroutes.js'

import cookieParser from "cookie-parser"
import cors from "cors"
import upload from './upload.js' // Multer config file
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express()



// using ejs as templeting engine for server side rendering 
app.set("view engine","ejs");
// setting path for all view folder 
app.set("views","./public");

// dealing with auth middleware 



app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.json());

// Allow all origins to access the API
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((req, res, next) => {
  console.log("Received Cookies:", req.cookies);
  next();
});
// establishing database connection 

connectionDb("mongodb://127.0.0.1:27017/Avinya");
// rendering static pages with help of view engine 
app.use('/',staticRouter)

// routing to user router 

app.use('/user',userRouter)

app.use('/main',mainRouter)

app.use('/post',postRouter)

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
    res.json({
      message: 'File uploaded successfully!',
      imageUrl: req.file.path, // Cloudinary URL of the uploaded image
    });
  });

app.listen(PORT,()=>{console.log(`server  running on ${PORT}`)});


