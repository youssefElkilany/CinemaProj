import { Schema,model } from "mongoose";

const catSchema = new Schema ({
    cinemaType:{
        type:String,
        unique:true,
        uppercase:true,
        enum:["IMAX","3D","4D","2D"],
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    //numOfScreens:Number
},{
    timestamps:true
})

const catModel = model('Category',catSchema)
export default catModel