import dns from "dns";
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const mongoUrl = process.env.mongoUrl;
import mongoose from "mongoose";


const connectDb = async()=>{
    try{
    await mongoose.connect(mongoUrl);
    console.log('database connected successfully'); 
    }
    catch(err)
    {
        console.log(err);
        throw(err)        
    }  
}
export default connectDb;