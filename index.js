
import express from "express"

import path from 'path'



import connectionDb from './connection.js'
import staticRouter from './routes/staticroutes.js'
import userRouter from './routes/userroutes.js'
import mainRouter from './routes/mainroutes.js'
import cookieParser from "cookie-parser"


const PORT = 8000
const app = express()



// using ejs as templeting engine for server side rendering 
app.set("view engine","ejs");
// setting path for all view folder 
app.set("views","./public");

// dealing with auth middleware 



app.use(express.urlencoded({extended : false}));
app.use(cookieParser());



// establishing database connection 

connectionDb("mongodb://127.0.0.1:27017/Task4");
// rendering static pages with help of view engine 
app.use('/',staticRouter)

// routing to user router 

app.use('/user',userRouter)

app.use('/main',mainRouter)

app.listen(PORT,()=>{console.log("server  running on ")});


