
// this porvide jwt services 

import jwt from 'jsonwebtoken';

const secretKey = "rohan@123";

const setUser = (user)=>{
  const  payload = {
    _id : user._id,
    username: user.username,
    email : user.email,
  }
return jwt.sign(payload,secretKey);
}

const getUser = (token)=>{
    if(!token) return null;
    try{
        return jwt.verify(token,secretKey);
    }
    catch(err){
        return null;
    }
}

export default {setUser,getUser};