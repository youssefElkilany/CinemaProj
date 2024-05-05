// import userModel from "../../DB/Models/User.js";
// import { asyncHandler } from "../Utils/ErrorHandling.js";
 import  jwt  from "jsonwebtoken";
import userModel from "../../DB/Models/User.js";
import { asyncHandler } from "../Utils/ErrorHandling.js";

// const Auth = asyncHandler(async(req,res,next)=>{

//    const {authorization}  = req.headers

//    if(!authorization?.startsWith("hamdada"))
//    {
//     return res.json("no auth found")
//    }

//    const token = authorization.split("hamada")[1]

//    if(!token)
//    {
//     return res.json("no token found")
//    }
   
//   const decoded = jwt.verify(token,"secret")
//   if(!decoded?.id)
//   {
//     return res.json("wrong payload in token")
//   }

//   const user = await userModel.findById(decoded.id)
//   if(!user)
//   {
//     return res.json("no user found")
//   }

//   req.user = user
  
//  return next()


// })



const auth =asyncHandler ( async (req,res,next)=>{

  const {authorization} = req.headers

  if(!authorization?.StartWith("hamada"))
  {
    return res.json("no auth found or bearer key")
  }

  const token  = authorization.split("hamada")[1]

  if(!token)
  {
    return res.json("no token found")
  }
  const decoded = jwt.verify(token,"secret")

  if(!decoded?.id)
  {
    return res.json("no token payload")
  }

  const user = await userModel.findById(decoded.id)
  if(!user)
  {
    return res.json("no user found")
  }

  req.user = user
  return next()
  

})