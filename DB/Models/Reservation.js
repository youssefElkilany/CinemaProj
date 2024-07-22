import { Schema,Types,model } from "mongoose";

const reserveSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    film:{
        filmId:{
            type:Types.ObjectId,
            ref:"Film",
            required:true
        },
        filmName:{
            type:String,
            required:true
        },
        seat:[{
            seatDegree:{ // => A or B or C
                type:String,
                required:true
            },
            seatNo:{
                type:Number,
                required:true
            }
        }],
        day:{type:Date,required:true},
        startTime:{type:String,required:true},
    },
    
    screen:{
        screenId:{
            type:Types.ObjectId,
            ref:"Screen",
            required:true
        },
        screenName:{
            type:String,
            required:true
        }
    },
    
    category:{

        categoryId:{
            type:Types.ObjectId,
            ref:"Category",
            required:true
        },
        categoryName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    },
    
    tickets:{type:Number,default:1,required:true},
    couponId:{type:Types.ObjectId,ref:'Coupon'},
    subTotal:{type:Number,required:true}, // mn 8eer discount
    total:{type:Number,required:true}, // n7sb 3aleeh discount
    paymentMethod:{
        type:String,
        default:"cash",
        Enum:['cash','visa']
    },
    status:{
        type:String,
        default:"placed",
        enum:['waitingForPayment','cancelled','placed']
    }




},{
    timestamps:true
})


const reserveModel = model("Reserve",reserveSchema)
export default reserveModel