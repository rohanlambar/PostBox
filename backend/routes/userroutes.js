
import express from 'express'
import userHandler from '../controllers/user.js'


const {handleUserLogin,handleUserSignUp}  = userHandler;
const router = express.Router();


router.post('/signup',handleUserSignUp);

router.post('/login',handleUserLogin);

export default router;