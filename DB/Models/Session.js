import { Schema,Types,model } from "mongoose";

const sessionSchema = new Schema({
    instructorId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    customerId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    completed:{
        type:Boolean,
        default:"false",
        required:true
    },
    price:{
        type:Number,
        required:true
    },

})

const sessionModel = ('Session',sessionSchema)
export default sessionModel