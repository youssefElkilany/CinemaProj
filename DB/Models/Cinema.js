import { Schema , model } from "mongoose";

const cinemaSchema = new Schema({
    cinemaName:{type:String,unique:true,required:true},
    location:{type:String,required:true}
})

const cinemaModel = model("Cinema",cinemaSchema)
export default cinemaModel