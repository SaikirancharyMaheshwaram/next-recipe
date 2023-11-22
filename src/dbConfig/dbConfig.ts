import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongo DB connected successfully");
        })
        connection.on('error',(e)=>{
            console.log(e);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something went Wrong error in catch block of dbconfig");
        console.log(error);
    }
}