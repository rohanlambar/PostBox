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
          role : {
            type : String,
            default : "user",
          }
        },
        { 
            timestamps: true
        }
    );

const User = mongoose.model("User_Data",userSchema);

export default User;


