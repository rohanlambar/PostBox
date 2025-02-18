
// this are all static routes 

import express from 'express'

const router = express.Router()

router.get('/signup',(req,res)=>{
    res.render('Signup');
})

router.get('/login',(req,res)=>{
    res.render('Login')
})

export default  router;