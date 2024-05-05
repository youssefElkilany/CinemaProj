import { Schema,model } from "mongoose";

const walletSchema = new Schema({
    balance:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        //required:true
    }
})

const walletModel = model("Wallet",walletSchema)
export default walletModel