import catModel from "../../../../DB/Models/Categories.js"
import screenModel from "../../../../DB/Models/Screens.js"
import { asyncHandler } from "../../../Utils/ErrorHandling.js"


export const getScreens = asyncHandler(async (req,res,next)=>{

    const getScreen = await screenModel.find()

   // return res.json({Msg:"all screens",getScreen})
   return getScreen
})

export const getScreenss = asyncHandler(async (req,res,next)=>{

    const getScreen = await screenModel.find()

    return res.json({Msg:"all screens",getScreen})
   
})



export const addScreen =asyncHandler( async (req,res,next)=>{
 
    const {screenName,categoryId,seatsA,seatsB,seatsC,seatsD,seatsF,seatsE} = req.body

    const findCategory = await catModel.findById(categoryId)
    if(!findCategory)
    {
        return res.json("categoryId not found")
    }

    const findscreen  = await screenModel.findOne({screenName,categoryId})
    if(findscreen)
    {
        return res.json("screen already exist with this category")
    }

    const addScreen = await screenModel.create({screenName,categoryId,seatsA,seatsB,seatsC,seatsD,seatsF,seatsE})

    return res.json({msg:"added",addScreen})

})

export const updateScreen =asyncHandler( async (req,res,next)=>{

    const {screenName,categoryId,seatsA,seatsB,seatsC,seatsD,seatsF,seatsE} = req.body

    const findId = await screenModel.findById(req.body.id)
    if(!findId)
    {
        return res.json("id not found")
    }

    const findcat = await catModel.findOne(categoryId)
    if(!findcat)
    {
        return res.json("categoryId not found")
    }

    

    if(screenName)
    {
        const findName = await screenModel.findOne({screenName})
        if(findName)
        {
            const sameName = await screenModel.findOne({id:req.body.id,screenName})
            if(!sameName) // if screenName not the original screenName
            {
                return res.json("name is already exist")
            }
           // keda mmkn y3ml find lel msh mawgood m3ah fe nafs category kman
        }
        findId.screenName = screenName
    }

    if(seatsA)
    {
        findId.seatsA = seatsA
    }
    if(seatsB)
    {
        findId.seatsB = seatsB
    }
    if(seatsC)
    {
        findId.seatsC = seatsC
    }
    if(seatsD)
    {
        findId.seatsD = seatsD
    }
    if(seatsE)
    {
        findId.seatsE = seatsE
    }
    if(seatsF)
    {
        findId.seatsF = seatsF
    }
    await findId.save()

    return res.json({Msg:"screen is updated"})

    // hagy lel update tany ashoof kont b3ml update ezay 

}
)

export const deleteScreen =asyncHandler( async (req,res,next)=>{

    const removeScreen = await screenModel.findByIdAndDelete(req.body.id)
    if(!removeScreen)
    {
        return res.json("id not found")
    }

    return res.json("screen has removed")
})