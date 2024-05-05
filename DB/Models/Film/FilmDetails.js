import { Schema,model } from "mongoose";

const detailsSchema = new Schema({
    filmName:{
        type:String,
        unique:true,
        required:true,
    },
    actors:[{
        type:String,
        required:true
    }],

    writers:[{
        type:String,
         // nshoof unique fel array wla unique 3mtn
        required:true
    }],
    directors:[{
        type:String,
        required:true
    }],
    genre:[{
        type:String,
        required:true
    }],
    releaseDate:Date,
    duration:{type:String,required:true},
    rating:Number,
    image:{public_id:String  ,  secure_url:String},
    photos:[{public_id:String  ,  secure_url:String}],
    trailer:{public_id:String  ,  secure_url:String}

},{
    timestamps:true
})


// 3ayz hena lma yeegy y8yr filmName y8yr kol names el feeha filmDetailsId eltab3ha

const detailsModel = model("FilmDetails",detailsSchema)
export default detailsModel

