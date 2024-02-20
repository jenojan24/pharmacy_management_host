import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongo=async()=>{
    try{
        const res= await mongoose.connect(process.env.MONGO_URI); 
      
     if(res){
      console.log("connected sucessfully");
     }
      }catch(error){
          console.log(error);
      }
};

export default connectToMongo;