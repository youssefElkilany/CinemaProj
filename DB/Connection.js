import mongoose from "mongoose"

const connectDB = async()=>{
    return await mongoose.connect("mongodb://0.0.0.0:27017/Cinema").then(()=>{
        console.log("DB is connected")
    }).catch(err=>{
        console.log(`DB is not connected`)
    })
}

export default connectDB