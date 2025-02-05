

import authMiddleware from '../middlewares/authentication.js'
import express from "express"

const router = express.Router();


const {checkForAuthentication} = authMiddleware;

router.get('/data',checkForAuthentication,(req,res)=>{
    console.log("this is final")
    const html = `<h1> This is Homepage </h1>`
    return res.render('Homepage')
})

export default router;