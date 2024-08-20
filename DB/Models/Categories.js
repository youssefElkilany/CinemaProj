import { Schema,Types,model } from "mongoose";

const catSchema = new Schema ({
    cinemaType:{
        type:String,
        uppercase:true,
        enum:["IMAX","3D","4D","2D","standard"],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cinemaId:{type:Types.ObjectId,ref:"Cinema",required:true}//to know that categories related to this cinema
    //numOfScreens:Number
},{
    timestamps:true
})

const catModel = model('Category',catSchema)
export default catModel