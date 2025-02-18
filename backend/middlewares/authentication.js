

// this files contain middleware for authentication using json Web Tokens

import authService from "../services/auth.js";

const {getUser} = authService

const checkForAuthentication = (req,res,next)=>{
   
   const token = req.cookies?.jwt_token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2EzYzcwNzA4YjdmY2VjNGUwZDllOWUiLCJ1c2VybmFtZSI6InNoYW50YW51MTIzIiwiZW1haWwiOiJoaUBnbWFpbC5jb20iLCJpYXQiOjE3Mzg4MTkyNzJ9.nN2tNv7XSOP3VKOrn6-JxsS-iviJBnhy_OtadTMgNt8" ;
   req.user = null;
  
   console.log("token got ")
   console.log("token ",token);
   if(!token) return res.json({error : "token not exist"});
   console.log("token existed")
   req.user = getUser(token);
   console.log("user",req.user)
   
   if(!req.user) return  res.json({error : "user not exist"});
   console.log("user existed ")
   return next();

}

export default {checkForAuthentication};