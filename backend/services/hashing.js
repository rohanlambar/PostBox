import bcrypt from 'bcrypt'

 const hashPassword = async (ogPassword)=>{
    try {
       const hashedPassword =  await bcrypt.hash(ogPassword,10);

          console.log("hased password is followig ",hashedPassword);
          return hashedPassword;
        }
    catch(err){
        console.log("error found bro ",err);
    }
}

 const isSame = async (receivedPassword,storePassword) =>{
        const result = await bcrypt.compare(receivedPassword,storePassword); 
        return result ;
}


export default { hashPassword,isSame };

