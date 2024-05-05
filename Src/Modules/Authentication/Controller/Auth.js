import userModel from "../../../../DB/Models/User.js";
import { asyncHandler } from "../../../Utils/ErrorHandling.js";
import bcrypt from "bcrypt"
import cryptoJS from "crypto-js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken"
import sendEmail from "../../../Utils/sendEmail.js";

export const signUp = asyncHandler(async (req,res,next)=>{
    const {name,email,password,cpassword,phone} = req.body

    const findEmail = await userModel.findOne({email})
    if(findEmail)
    {
        return res.json("email already exist")
    }
    if(password !=cpassword)
    {
        return res.json("password mismatch")
    }
   const hashedPass = bcrypt.hashSync(password,6)
   const cryptedPhone = cryptoJS.AES.encrypt(phone,'secret').toString()
   


   const user = await userModel.create({name,email,password:hashedPass,phone:cryptedPhone})
   if(!user)
   {
    return res.json("something wrong in creating user")
   }
   const token = jwt.sign({_id:user._id,email},"email") // n5ly token dont expire
   //const token2 = jwt.sign({_id:user._id,email},"email",{expiresIn:"24h"})
   const html = `<a href = "${req.protocol}://${req.headers.host}/auth/emailConfirmation/${token}">EmailConfirmation </a>`

   sendEmail({to:user.email,subject:"confirmationEmail",html})

   // hn7ot hena send email
   return res.json("check ur email to verify ur account")



})

export const login = asyncHandler(async (req,res,next)=>{

    const {email,password} = req.body

    const findUser = await userModel.findOne({email})
    if(!findUser)
    {
        return res.json("email not found")
    }
    if(!bcrypt.compareSync(password,findUser.password))
    {
        return res.json("wrong password")
    }


    jwt.sign({_id:findUser._id,email:findUser.email},"secret",{expiresIn:"3h"})

    return res.json({token})
})

export const confirmationEmail = asyncHandler(async (req,res,next)=>{

    const {token} = req.params

   const verifiedToken =  jwt.verify(token,"email")
   
   const findUser = await userModel.findOne({_id:verifiedToken._id})
   if(!findUser)
   {
    return res.json("user not found go to signup")
   }
   if(findUser.confirmEmail)
   {
    return res.json("email already confirmed")
   }
   else{
    const findUser = await userModel.findOneAndUpdate({_id:verifiedToken._id},{confirmEmail:true})
   }


   return res.json("ur email have been confirmed")
})


export const forgetPassword = asyncHandler(async (req,res,next)=>{

    const {email,code,newPass,cPass} = req.body
    // hyktb email hb3tlo code 3la gmail lma yshoof code y2dr yktbo 3la application b3deeha y8yr pass

    const findEmail = await userModel.findOne({email})
    if(!findEmail)
    {
        return res.json("email not found")
    }
     code = nanoid()
    const html =  `ur otp code is ${code}`
    sendEmail({to:findEmail.email,subject:"recover account",html})
    findEmail.code = code
   await findEmail.save()

   if(code != findEmail.code)
   {
    return res.json("wrong code")
   }

   if(newPass == cPass)
   {
    return res.json("password mismatch")
   }
   const newCode = nanoid()
   const hashedPass = bcrypt.hashSync(newPass,6)

   const changePass = await userModel.updateOne({email},{password:hashedPass,code:newCode})

   return res.json("password changed successfully")


})

export const logout = asyncHandler(async (req,res,next)=>{

})


export const signUp2 = asyncHandler(async (req,res,next)=>{
    const {name,email,password,cpassword,phone} = req.body

    const findEmail = await userModel.findOne({email})
    if(findEmail)
    {
        return res.json("email already exist")
    }
    if(password !=cpassword)
    {
        return res.json("password mismatch")
    }
   const hashedPass = bcrypt.hashSync(password,6)
   const cryptedPhone = cryptoJS.AES.encrypt(phone,'secret').toString()
   // nktb el7aga el asasya el required for both b3deeha n3ml keda
   if(role == "Instructor")
   {
    // n3ml hena el7agat el required lel instructor
    // create htkoon gowa hena 
   }
   if(role == "User")
   {
    // n3ml hena el7agat el required lel User
    // create htkoon gowa hena 
   }


   const user = await userModel.create({name,email,password:hashedPass,phone:cryptedPhone})
   if(!user)
   {
    return res.json("something wrong in creating user")
   }
   const token = jwt.sign({_id:user._id,email},"email") // n5ly token dont expire
   //const token2 = jwt.sign({_id:user._id,email},"email",{expiresIn:"24h"})
   const html = `<a href = "${req.protocol}://${req.headers.host}/auth/emailConfirmation/${token}">EmailConfirmation </a>`

   sendEmail({to:user.email,subject:"confirmationEmail",html})

   // hn7ot hena send email
   return res.json("check ur email to verify ur account")



})

export const login2 = asyncHandler(async (req,res,next)=>{

    const {email,password} = req.body

    const findUser = await userModel.findOne({email})
    if(!findUser)
    {
        return res.json("email not found")
    }
    if(!bcrypt.compareSync(password,findUser.password))
    {
        return res.json("wrong password")
    }


    jwt.sign({_id:findUser._id,email:findUser.email},"secret",{expiresIn:"3h"})
    //elmfrood mn 3nd frontEnd aw ana
    if(findUser.role == "Instructor")
    {
        return res.json({token,Msg:"login succssessfully",Role:"instructor"})
    }
    else if(findUser.role == "User")
    {
        return res.json({token,Msg:"login succssessfully",Role:"User"})
    }
    else
    {
        return res.json({token,Msg:"login succssessfully",Role:"admin"})
    }

    
    
})