import { Schema,Types,model } from "mongoose";

const filmreserveSchema = new Schema({
    numOfTickets:{type:Number,required:true}, // available tickets
    filmName:{type:String,required:true},
    availableSeats:{
        seatA:{
            seatsA:[{
                type:String,
                required:true
            }],
            seatAlpha:{
                type:String,
                default:"A"
            }
        },
        seatB:{
            seatsB:[{
                type:String,
                required:true
            }],
            seatAlpha:{
                type:String,
                default:"B"
            }
        },
        
        seatC:{
            seatsC:[{
                type:String,
                required:true
            }],
            seatAlpha:{
                type:String,
               default:"C"
            }
        },
        seatD:{
            seatsD:[{
                type:String,
                required:true
            }],
            seatAlpha:{
                type:String,
                default:"D"
            }
        },
        seatE:{
            seatsE:[{
                type:String,
            }],
            seatAlpha:{
                type:String,
               default:"E"
            }
        },
        seatF:{
            seatsF:[{
                type:String,
               
            }],
            seatAlpha:{
                type:String,
                default:"F"
            }
        },
       
    },
    // availableSeats:{
    //     seatsA:[{
    //         type:String,
    //         required:true
    //     }],
    //     seatB:[{
    //         type:String,
    //         required:true
    //     }],
    //     seatC:[{
    //         type:String,
    //         required:true
    //     }],
    //     seatD:[{
    //         type:String,
    //         required:true
    //     }],
    //     seatE:[{
    //         type:String,
    //     }],
    //     seatF:[{
    //         type:String,
    //     }],
    // },
    day:{type:Date,required:true},
    startTime:{type:String,required:true},
    endTime:{type:Date}, // end time user elmfrood my5taroosh ana bas ela7to mmkn 23ml beeh check
    fullStartDate:{type:Date},
    fullEndDate:{type:Date},
    filmDetId:{ // mmkn ns5tm endtime en film elb3deeh lazm ybtdy b3d endtime dah lw 3la nafs screen 8eer keda 3ady
        type:Types.ObjectId,
        ref:"FilmDetails",
        required:true
    },
    screenId:{
        type:Types.ObjectId,
        ref:"Screen",
        required:true
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
        required:true
    }

})

const filmModel = model("Film",filmreserveSchema)
export default filmModel