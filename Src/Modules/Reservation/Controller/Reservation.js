import catModel from "../../../../DB/Models/Categories.js";
import detailsModel from "../../../../DB/Models/Film/FilmDetails.js";
import filmModel from "../../../../DB/Models/Film/FilmReservation.js";
import reserveModel from "../../../../DB/Models/Reservation.js";
import screenModel from "../../../../DB/Models/Screens.js";
import userModel from "../../../../DB/Models/User.js";
import { asyncHandler } from "../../../Utils/ErrorHandling.js";
import { sha256 } from 'js-sha256';
import axios from 'axios';

export const reserveFilm = asyncHandler(async (req,res,next)=>{
    //const {userId,categoryId,screenId,filmId} = req.body

    const {filmId,day,startTime,userId,categoryId,screenId,seats,seatDegree,seatNo,tickets,subTotal} = req.body
   // const user = req.user._id
   //const user = req.user
    const findseats = await filmModel.findById(filmId)
    if(!findseats)
    {
        return res.json("filmId not found")
    }
    // mynf3sh n7ot id hena 3shan hygeeb film wa7ed bas w day bta3o bas
    const findDays = await filmModel.find({day}).select("day") // ngeeb min 2
    if(!findDays)
    {
        return res.json("no days available")
    }

    const findTime = await filmModel.find({startTime,day}).select("startTime")//hn3ml hena populate mrteen 3la screen w category
    if(!findTime)
    {
        return res.json("no time available")
    }
    console.log(findTime.screenId)
    const findScreen = await screenModel.findById(findTime[0].screenId).select('screenName') 
    if(!findScreen)
    {
        return res.json("no screens available")
    }
    // n3ml populate ngeeb screens mn id bta3ha

    const findCategory = await catModel.findById(findScreen.categoryId).select("cinemaType")
    if(!findCategory)
    {
        return res.json("category not found")
    }
   
    // check for ids from here
    const findUser = await userModel.findById(userId)
    if(!findUser)
    {
        return res.json("user not found")
    }

    // const findCategory = await catModel.findById(categoryId)
    // if(!findCategory)
    // {
    //     return res.json("category not found")
    // }

    // const findScreen = await screenModel.findById(screenId)
    // if(!findScreen)
    // {
    //     return res.json("screen not found")
    // }
    // checkpoint => checked all ids and time

    //check that there is a seat available


    if(seats?.length)
    {
        for (const seat of seats) {

            if(seat.seatDegree == "A")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatA.seatAlpha':seat.seatDegree})
                if(!findseats)
                {
                    return res.json("seat not available")   
                }
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }
                 
            }
            if(seat.seatDegree == "B")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatB.seatAlpha':seat.seatDegree})
                if(!findseats)
                {
                    return res.json("seat not available")
                }
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }
            }
            if(seat.seatDegree == "C")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatC.seatAlpha':seat.seatDegree})
                if(!findseats)
                {
                    return res.json("seat not available")
                }
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }
            }
            if(seat.seatDegree == "D")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatD.seatAlpha':seat.seatDegree})
                if(!findseats)
                {
                    return res.json("seat not available")
                }
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }
            }
            if(seat.seatDegree == "E")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatE.seatAlpha':seat.seatDegree})
                if(findseats)
                {
                    return res.json("seat not available")
                }
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }
            }
            if(seat.seatDegree == "F")
            {
                const findseats = await filmModel.findOne({_id:filmId,'availableSeats.seatF.seatAlpha':seat.seatDegree})
                if(!findseats)
                {
                    return res.json("seat not available")
                }
                
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    if(seat.seatNo != seatA)
                    {
                        return res.json("this seatNo not available")
                    }
                }

            }
           

            
        }
    }

    tickets = seats.length
    subTotal = findCategory.price * tickets

    //total = subTotal / req.body.coupon || 1
    total = (subTotal - (subTotal * (req.body.coupon || 0)/100))
// category , screen , film , user
    const reserve = await reserveModel.create({
        tickets,paymentMethod,
        status:paymentMethod == "card" ? "waitingForPayment" :  "placed" ,
        subTotal,total,
        // "category.categoryId":1,
        // "category.categoryName":1,
        // "category.price":1,
        // "Screen.screenId",
        // "Screen.screenName",
        // "film.filmId",
        // "film.filmName",
        "film.seat":seats
        // "film.seat.seatDegree",
        // "film.seat.seatNo",
        // "film.day",
        // "film.startTime",

    })

    for (const seat of seats) {
        if(seat.seatDegree == "A")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatA.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatA:{
                                seatsA:seat.seatNo
                            }
                        }
                    }
                })
                if(!findseats)
                {
                    return res.json("didnt find seatNo")   
                }
               
                 
            }
            if(seat.seatDegree == "B")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatB.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatB:{
                                seatsB:seat.seatNo
                            }
                        }
                    }
                })
                if(!findseats)
                {
                    return res.json("didnt find seatNo")  
                }
                
            }
            if(seat.seatDegree == "C")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatC.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatC:{
                                seatsC:seat.seatNo
                            }
                        }
                    }
                })
                if(!findseats)
                {
                    return res.json("didnt find seatNo")  
                }
                
            }
            if(seat.seatDegree == "D")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatD.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatD:{
                                seatsD:seat.seatNo
                            }
                        }
                    }
                })
                if(!findseats)
                {
                    return res.json("didnt find seatNo")  
                }
                
            }
            if(seat.seatDegree == "E")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatE.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatE:{
                                seatsE:seat.seatNo
                            }
                        }
                    }
                })
                if(findseats)
                {
                    return res.json("didnt find seatNo")  
                }
              
            }
            if(seat.seatDegree == "F")
            {
                const findseats = await filmModel.findOneAndUpdate({_id:filmId,'availableSeats.seatF.seatAlpha':seat.seatDegree},{
                    $pull:{
                        availableSeats:{
                            seatF:{
                                seatsF:seat.seatNo
                            }
                        }
                    }
                })
                if(!findseats)
                {
                    return res.json("didnt find seatNo")  
                }
                
                
            }
           
    }
   
    //subTotal = price of category * seats.length


    // b3d ma y7gz w ydf7 nsheel seats mn film reservation

   
})




export const reserveFilm2 = asyncHandler(async (req,res,next)=>{
    //const {userId,categoryId,screenId,filmId} = req.body

    let {filmId,cinemaType,filmDetId,day,startTime,userId,categoryId,screenId,seats,seatDegree,seatNo,tickets,subTotal,total} = req.body
   // const user = req.user._id
   //const user = req.user

   const filmDet = await detailsModel.findById(filmDetId)
   if(!filmDet)
   {
    return res.json("detailsId not found")
   }

   
// find related categories belongs to the film
   const filmCategory = await filmModel.find({filmDetId}).populate([{
    path:"categoryId",
    select:"cinemaType"
   }])
  // console.log({filmCategory});
   if(!filmCategory)
   {
    return res.json("no categories available")
   }
   
// get categoryId

   const findCategory = await catModel.findOne({cinemaType})//.select("cinemaType")
   //console.log({findCategory});
   if(!findCategory)
   {
       return res.json("category not found")
   }
  
   
// // 23tkd ynf3 23ml search bel id aw bel cinemaType
// // lma howa y5tar cinemaType ygeeb id bta3ha 3ady 
   const findDays = await filmModel.find({categoryId:findCategory._id,filmDetId}).select("day") // ngeeb min 2
  console.log({findDays});
   if(!findDays)
   {
       return res.json("no days available")
   }
   
console.log({categoryId:findCategory._id})
   const findTime = await filmModel.find({filmDetId,categoryId:findCategory._id,day}).select("startTime categoryId")//hn3ml hena populate mrteen 3la screen w category
   console.log({findTime})
   if(!findTime)
   {
       return res.json("no time available")
   }
   
//   return res.json({findTime})
   const findScreen = await filmModel.findOne({filmDetId,categoryId:findCategory._id,startTime,day}).populate([{
    path:"screenId",
    select:"screenName"
   }])
   console.log({findScreen})
   if(!findScreen)
   {
       return res.json("no screens available")
   }
   //console.log({screenName:findScreen.screenId.screenName})
   
   //return res.json({findScreen})
/////////////////////////////////////////////////////////   hena
    // const findseats = await filmModel.findById(filmId)
    // if(!findseats)
    // {
    //     return res.json("filmId not found")
    // }
    // mynf3sh n7ot id hena 3shan hygeeb film wa7ed bas w day bta3o bas
   

   
  
    // n3ml populate ngeeb screens mn id bta3ha

   
   
    // check for ids from here
    // const findUser = await userModel.findById(userId)
    // if(!findUser)
    // {
    //     return res.json("user not found")
    // }

   
    // checkpoint => checked all ids and time

    //check that there is a seat available


    if(seats?.length)
    {console.log({seats});
        console.log(seats.length);
        for (const seat of seats) {

        //     let d = `availableSeats.seat${seat.seatDegree}.seatAlpha`
        //     console.log({d})
        //    const findseats = await filmModel.findOne({_id:findScreen._id,d:seat.seatDegree})      
        //     console.log({findseats})

        const query = {};
query[`availableSeats.seat${seat.seatDegree}.seatAlpha`] = seat.seatDegree;
const findseats = await filmModel.findOne({_id: findScreen._id, ...query});
console.log({findseats})
    if(!findseats)
                {
                    return res.json("seatA not available")   
                }
               

            

            if(seat.seatDegree == "A")
            {
            
                // const findseats = await filmModel.findOne({_id:findScreen._id,'availableSeats.seatA.seatAlpha':seat.seatDegree})
                // if(!findseats)
                // {
                //     return res.json("seatA not available")   
                // }
                let flag = false
                for (const seatA of findseats.availableSeats.seatA.seatsA) {
                    
                    if(seat.seatNo == seatA)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
                 
            }
           else if(seat.seatDegree == "B")
            {
                
                let flag = false
                for (const seatB of findseats.availableSeats.seatB.seatsB) {
                    
                    if(seat.seatNo == seatB)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
            }
            else if(seat.seatDegree == "C")
            {
               
                let flag = false
                for (const seatC of findseats.availableSeats.seatC.seatsC) {
                    
                    if(seat.seatNo == seatC)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
            }
           else if(seat.seatDegree == "D")
            {
               
                let flag = false
                for (const seatD of findseats.availableSeats.seatD.seatsD) {
                    
                    if(seat.seatNo == seatD)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
            }
           else if(seat.seatDegree == "E")
            {
               
                let flag = false
                for (const seatE of findseats.availableSeats.seatE.seatsE) {
                    
                    if(seat.seatNo == seatE)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
            }
           else if(seat.seatDegree == "F")
            {
               
                
                let flag = false
                for (const seatF of findseats.availableSeats.seatF.seatsF) {
                    
                    if(seat.seatNo == seatF)
                    {
                        flag = true
                    }
                }
                if(!flag)
                {
                    return res.json("this seatNo not available")
                }
            }
            else{
                return res.json("Wrong seatDegree")
            }
           

            
        }
    }

     tickets = seats?.length
     subTotal = findCategory.price * tickets
     console.log({tickets})
     console.log({subTotal})

    //total = subTotal / req.body.coupon || 1
    total = (subTotal - (subTotal * (req.body.coupon || 0)/100))
    console.log({total})
// category , screen , film , user
    // const reserve = await reserveModel.create({
    //     tickets,paymentMethod,
    //     status:paymentMethod == "card" ? "waitingForPayment" :  "placed" ,
    //     subTotal,total,
    //     "category.categoryId":findCategory._id,
    //     "category.cinemaType":findCategory.cinemaType,
    //      "category.price":findCategory.price,
    //      "screen.screenId":findScreen.screenId,
    //      "screen.screenName":findScreen.screenId.screenName,
    //     "film.filmId":findScreen._id,
    //     "film.filmName":findScreen.filmName,
    //     "film.seat":seats,
    //     // "film.seat.seatDegree",
    //     // "film.seat.seatNo",
    //     "film.day":day,
    //     "film.startTime":startTime

    // })
// changes after reservation
    for (const seat of seats) {
console.log("Ggggg");
        const query1 = {}
        query1[`availableSeats.seat${seat.seatDegree}.seatAlpha`] = seat.seatDegree 
        console.log({query1})
        console.log({...query1});
        const query2 = {}
        query2[`availableSeats.seat${seat.seatDegree}.seats${seat.seatDegree}`] = seat.seatNo
        console.log({query2})
        console.log({...query2});
         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,...query1},{
             $pull:{
                 // ...query
                 // 'availableSeats.seatA.seatsA':seat.seatNo
                    ...query2
                 
             }
         })
         if(!findseats)
         {
             return res.json("didnt find seatNo")   
         }



        // if(seat.seatDegree == "A")
        //     {
        //        const query1 = {}
        //        query1[`availableSeats.seat${seat.seatDegree}.seatAlpha`] = seat.seatDegree 
        //        const query = {};
        //        query[`availableSeats.seat${seat.seatDegree}.seatAlpha`] = seat.seatDegree;
        //        const query2 = {}
        //        query2[`availableSeats.seat${seat.seatDegree}.seats${seat.seatDegree}`] = seat.seatNo
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,...query1},{
        //             $pull:{
        //                 // ...query
        //                 // 'availableSeats.seatA.seatsA':seat.seatNo
        //                    ...query2
                        
        //             }
        //         })
        //         if(!findseats)
        //         {
        //             return res.json("didnt find seatNo")   
        //         }
               
                 
        //     }
        //     if(seat.seatDegree == "B")
        //     {
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,'availableSeats.seatB.seatAlpha':seat.seatDegree},{
        //             $pull:{
        //                 // 'availableSeats.seatB':{
        //                 //     seatsB:seat.seatNo
        //                 // }
        //                 //'availableSeats.seatB.seatsB':seat.seatNo
        //                 ...query2
        //             }
        //         })
        //         if(!findseats)
        //         {
        //             return res.json("didnt find seatNo")  
        //         }
                
        //     }
        //     if(seat.seatDegree == "C")
        //     {
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,'availableSeats.seatC.seatAlpha':seat.seatDegree},{
        //             $pull:{
                        
        //                 // 'availableSeats.seatC.seatsC':seat.seatNo
        //                 ...query2
        //             }
        //         })
        //         if(!findseats)
        //         {
        //             return res.json("didnt find seatNo")  
        //         }
                
        //     }
        //     if(seat.seatDegree == "D")
        //     {
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,'availableSeats.seatD.seatAlpha':seat.seatDegree},{
        //             $pull:{
        //                 //'availableSeats.seatD.seatsD':seat.seatNo
        //                 ...query2
        //             }
        //         })
        //         if(!findseats)
        //         {
        //             return res.json("didnt find seatNo")  
        //         }
                
        //     }
        //     if(seat.seatDegree == "E")
        //     {
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,'availableSeats.seatE.seatAlpha':seat.seatDegree},{
        //             $pull:{
        //                 'availableSeats.seatE.seatsE':seat.seatNo
        //             }
        //         })
        //         if(findseats)
        //         {
        //             return res.json("didnt find seatNo")  
        //         }
              
        //     }
        //     if(seat.seatDegree == "F")
        //     {
        //         const findseats = await filmModel.findOneAndUpdate({_id:findScreen._id,'availableSeats.seatF.seatAlpha':seat.seatDegree},{
        //             $pull:{
        //                 'availableSeats.seatF.seatsF':seat.seatNo
        //             }
        //         })
        //         if(!findseats)
        //         {
        //             return res.json("didnt find seatNo")  
        //         }
                
                
        //     }
           
    }
   
    //subTotal = price of category * seats.length


    // b3d ma y7gz w ydf7 nsheel seats mn film reservation

   
})







function FawryPayAtFawry() {
    let merchantCode    = "1tSa6uxz2nTwlaAmt38enA==";
    let merchantRefNum  = "23124654641";
    let merchant_cust_prof_id  = "777777";
    let payment_method = "PayAtFawry";
    let amount = "580.55";
    let merchant_sec_key =  "259af31fc2f74453b3a55739b21ae9ef";
    let signature_body = merchantCode.concat(merchantCode , merchantRefNum , merchant_cust_prof_id , payment_method , amount , merchant_sec_key);
   // let sha256 = new jsSHA('SHA-256', 'TEXT');
 console.log({signature_body})
    sha256.update(signature_body);
   // let hash_signature = sha256.getHash("HEX");
    axios.post('https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/charge', {
                  //  'merchantCode' : merchantCode,
                    'merchantRefNum' : merchantRefNum,
                    'customerName' : 'Ahmed Ali',
                    'customerMobile' : '01234567891',
                    'customerEmail' : 'example@gmail.com',
                    'customerProfileId' : '777777',
                    'amount' : '580.55',
                    'paymentExpiry' : '1631138400000',
                    'currencyCode' : 'EGP',
                    'language' : 'en-gb',
                    'chargeItems' : [{
                                          'itemId' : '897fa8e81be26df25db592e81c31c',
                                          'description' : 'Item Description',
                                          'price' : '580.55',
                                          'quantity' : '1'
                                      }],
                    //'signature' : hash_signature,
                    'paymentMethod' : payment_method,
                    'description': 'example description'
                })
                    .then(response => {
                        // Get Response Contents
                        let type          = response.data.type;
                        let paymentStatus = response.data.paymentStatus;
                        //
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
    }

   export const fawry = asyncHandler(async(req,res,next)=>{
    FawryPayAtFawry()
    return res.redirect('https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/charge')
   })