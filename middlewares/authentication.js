

// this files contain middleware for authentication using json Web Tokens

import authService from "../services/auth.js";

const {getUser} = authService

const checkForAuthentication = (req,res,next)=>{
   const token = req.cookies?.jwt_token;
   req.user = null;
   console.log("token got ")
   console.log("token ",token);
   if(!token) return res.redirect('/login');
   console.log("token existed")
   req.user = getUser(token);
   
   if(!req.user) return res.redirect('/login');
   console.log("user existed ")
   return next();

}

export default {checkForAuthentication};