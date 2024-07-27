import cinemaModel from "../../../../DB/Models/Cinema.js";
import { asyncHandler } from "../../../Utils/ErrorHandling.js";

export const getCinema = asyncHandler(async(req,res,next)=>{
    const cinema = await cinemaModel.find()

    return res.json({cinema})
})


export const addCinema = asyncHandler(async(req,res,next)=>{
    const {cinemaName,location} = req.body

    const findCinema = await cinemaModel.findOne({cinemaName})
    if(!findCinema)
    {
        return next(new Error("cinema already exist"))
    }

    const addCinema = await cinemaModel.create({cinemaName,location})
    if(!addCinema)
    {
        return next(new Error("cinema is not added"))
    }

    return res.json({Msg:"cinema is added successfully",Cinema:addCinema})
})

export const updateCinema = asyncHandler(async(req,res,next)=>{

    const {cinemaId} = req.params
    const {cinemaName , location} = req.body
    const findCinema = await cinemaModel.findById({_id:cinemaId})
    if(!findCinema)
        {
            return next(new Error("id not found"))
        }

    if(cinemaName)
    {
        const checkName = await cinemaModel.findOne({cinemaName})
        if(findCinema.cinemaName == checkName.cinemaName )
        {
            return next(new Error("it is the same name"))
        }
        if(checkName)
        {
            return next(new Error("name already exist"))
        }
        checkName.cinemaName = cinemaName
        await checkName.save()
    }

    if(location)
    {
        findCinema.location = location
        await location.save()
    }

    return res.status(200).json({Msg:"updaded successfully",findCinema})


})

export const deleteCinema = asyncHandler(async(req,res,next)=>{
    const {cinemaId} = req.params

    const findCinema = await cinemaModel.findByIdAndDelete({cinemaId})
    if(!findCinema)
    {
        return next(new Error("id not found"))
    }

    return res.status(200).json("cinema deleted")
})