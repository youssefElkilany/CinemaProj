import catModel from "../../../../DB/Models/Categories.js";
import cinemaModel from "../../../../DB/Models/Cinema.js";
import { asyncHandler } from "../../../Utils/ErrorHandling.js";

export const getAllCategories = async(req,res,next)=>{

    const cat = await catModel.find()
    console.log(cat)

    return res.json({msg:"done",cat})
   //return cat
}

export const getAllCategories2 = async(req,res,next)=>{

    const cat = await catModel.find().populate([{
        path:'cinemaId'
    }])
    if(!cat.length)
    {
        return next(new Error("no categories found"))
    }
    console.log({cat})

   // return res.json({msg:"done",cat})
   return res.status(200).json({cat})
}

export const getOneCategory = async(req,res,next)=>{
    const {cinemaType} = req.params

    const cat = await catModel.findOne({cinemaType}).populate([{
        path:'cinemaId'
    }])
    if(!cat)
    {
        return next(new Error("category is not found"))
    }
    

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



export const addCategory =asyncHandler( async (req,res,next)=>{

    const {cinemaType,price,cinemaId} = req.body
    console.log({cinemaType,price})

    const findCinema = await cinemaModel.findById(cinemaId)
    if(!findCinema)
    {
        return next(new Error({Msg:`cinemaId not found`}))
    }

    const findCat = await catModel.findOne({cinemaType,cinemaId})
    if(findCat)
    {
        return next(new Error({Msg:`type is already exist in related cinema`}))
    }
    //handle price of every cinemaType

    const addCat = await catModel.create({cinemaType,price,cinemaId})
    if(!addCat)
    {
        return next(new Error("nothing added"))
    }

    return res.json({msg:"created",addCat})
})
// n3ml hena cinemaId lw hn3dlo
export const updateCategory = asyncHandler(async (req,res,next)=>{

    const {categoryId} = req.query

    const findCat = await catModel.findById(categoryId)
    if(!findCat)
    {
       return next(new Error("id not found"))
    }

    if(req.body.cinemaType)
    {
        const findCat = await catModel.findOne({cinemaType,cinemaId:findCat.cinemaId})
    if(findCat)
    {
       return next(new Error({Msg:"type is already exist in related cinema"}))
    }
        findCat.cinemaType = req.body.cinemaType
       await findCat.save()
    }

    if(req.body.price)
    {
        findCat.price = req.body.price
        await findCat.save()
    }

    // n3dl cinemaId

    return res.json({Msg:"category updated successfully"})

})


export const deleteCat = async (req,res,next)=>{

    const removeCat = await catModel.findByIdAndDelete(req.query.id)
    if(!removeCat)
    {
        return res.json({Msg:"id not found"})
    }

    return res.json({Msg:"deleted"})
}

