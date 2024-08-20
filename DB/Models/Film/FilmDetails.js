import { Schema,Types,model } from "mongoose";

const detailsSchema = new Schema({
    filmName:{
        type:String,
        unique:true,
        uppercase:true, // nms7 data w nshooof htsht8l wla l2
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
    trailer:[{public_id:String  ,  secure_url:String}],
    status:{type:String,default:'soon',enum:['soon','now']},// lw Enum msh htsht8l lazem enum lowercase
    cinemaId:[{type:Types.ObjectId,ref:"Cinema"}]
},{
    timestamps:true
})


// 3ayz hena lma yeegy y8yr filmName y8yr kol names el feeha filmDetailsId eltab3ha

const detailsModel = model("FilmDetails",detailsSchema)
export default detailsModel

