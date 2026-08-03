import mongoose from "mongoose";
import dns from "dns"

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
console.log();

const connectDb = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("database connected");
    })
}
catch(err)
{
    console.log(err);
    
}
}

export { connectDb};


