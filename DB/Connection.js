import mongoose from "mongoose"

const connectDB = async()=>{
    return await mongoose.connect(process.env.DB_ATLAS).then(()=>{
        console.log("DB is connected")
    }).catch(err=>{
        console.log(`DB is not connected`)
    })
}

export default connectDB