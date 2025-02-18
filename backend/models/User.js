// creating user data model to store information of user for authentication 

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
          username : {
            type : String,
            required : true,
            unique : true,
          },
          password : {
            type : String ,
            required : true,
          },
          email : {
            type : String,
            required : true,
            unique : true,
          },
          profileImg : {
            type: String,
            
          }
        },
        { 
            timestamps: true
        }
    );

const User = mongoose.model("User",userSchema);

export default User;


