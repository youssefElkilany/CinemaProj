import catModel from "../../../../DB/Models/Categories.js";
import { asyncHandler } from "../../../Utils/ErrorHandling.js";

export const getAllCategories = async(req,res,next)=>{

    const cat = await catModel.find()
    console.log(cat)

    return res.json({msg:"done",cat})
   //return cat
}

export const getAllCategories2 = async(req,res,next)=>{

    const cat = await catModel.find()
    console.log(cat)

   // return res.json({msg:"done",cat})
   return res.status(200).json({cat})
}

export const getOneCategory = async(req,res,next)=>{
    const {cinemaType} = req.params

    const cat = await catModel.findOne({cinemaType})
    

    return res.status(200).json({msg:"done",cat})
}

export const getCategory = async(_,args)=>{
    
    const {cinemaType} = args
    console.log({cinemaType})
    const cat = await catModel.findOne({cinemaType})
    console.log({cat})
    if(!cat)
    {
        return{
            message:"type not found"
        }
        //return res.json("type not found")
    }

    //return res.json({msg:"done",cat})
    return cat
}



export const addCategory = async (req,res,next)=>{

    const {cinemaType,price} = req.body
    console.log({cinemaType,price})

    const findCat = await catModel.findOne({cinemaType})
    if(findCat)
    {
       return res.json({Msg:"type is already exist"})
    }
    //handle price of every cinemaType

    const addCat = await catModel.create({cinemaType,price})

    return res.json({msg:"created",addCat})
}

export const updateCategory = asyncHandler(async (req,res,next)=>{
    
})


export const deleteCat = async (req,res,next)=>{

    const removeCat = await catModel.findByIdAndDelete(req.body.id)
    if(!removeCat)
    {
        return res.json("id not found")
    }

    return res.json("deleted")
}

