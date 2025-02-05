

import mongoose from "mongoose";


const connectionDb =  (url)=>{
    // establishing database connectivity 
              return    mongoose.connect(url)
                                .then(()=>console.log("database connect on db Task4"))
                                .catch((err)=>console.error("caught error",err));
}

export default connectionDb;