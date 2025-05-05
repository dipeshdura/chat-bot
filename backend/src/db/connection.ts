import mongoose from "mongoose";

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
        
    } catch (error) {
        console.log("MONGODB ERROR");
        throw new Error("Cannot Connect To MongoDB")
        
    }
}

const disconnectDB =async()=>{
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
        
    }
}

export {
    connectDB,
    disconnectDB
};