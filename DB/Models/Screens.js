import { Schema,model,Types } from "mongoose";

const screenSchema = new Schema ({
    screenName:{type:String,required:true},
    // availableSeats:{type:Number,required:true},
   
        seatsA:{
            type:Number,
            required:true,
        },
        seatsB:{
            type:Number,
            required:true,
        },
        seatsC:{
            type:Number,
            required:true,
        },
        seatsD:{
            type:Number,
            required:true,
        },
        seatsE:{
            type:Number,
            default:0,
            required:true,
        },
        seatsF:{
            type:Number,
            default:0,
            required:true,
        },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    },
    cinemaId:{type:Types.ObjectId,ref:"Cinema",required:true}//to know that screens related to this cinema
})

const screenModel = model('Screen',screenSchema)

export default screenModel