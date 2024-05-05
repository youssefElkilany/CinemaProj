import catModel from "../../../../DB/Models/Categories.js"
import detailsModel from "../../../../DB/Models/Film/FilmDetails.js"
import filmModel from "../../../../DB/Models/Film/FilmReservation.js"
import screenModel from "../../../../DB/Models/Screens.js"
import { asyncHandler } from "../../../Utils/ErrorHandling.js"

// all films that can be reserved by people in this file
export const getAllFilms = asyncHandler(async (req,res,next)=>{

    const allFilms = await filmModel.find()

    

   // return res.json("all films",allFilms)
   return allFilms
})

// yb2a msh hn3ml get all films mn hena hn3ml get all films mn details 
// hyb2a 3obara 3n image wnta t5tar booking wla film details


// films el ynf3 tt7gz bas el time bta3ha lesa available
export const getAvailableFilms = asyncHandler(async (req,res,next)=>{
    // n3ml check 3la day

    const availableFilms = await filmModel.find()

    let films = []
    for (const film of availableFilms) {
        
        if(film.day > Date.now())
        {
            films.push(film)
        }
    }

    // n7awel n3mlha btaree2a tanya nst5dm while fel query mn 8eer loops 

    return res.json({Msg:"all films",films})
})


// ============== addReservation =============================

// bn3ml add  information of reservation details of films
export const addReservation = asyncHandler( async (req,res,next)=>{

    let {filmName,numOfTickets,day,startTime,endTime,filmDetId,screenId,categoryId,seatsA,seatsB,seatsC,seatsD,seatsE,seatsF} = req.body




//     const findFilm = await detailsModel.findById(filmDetId)
//     if(!findFilm)
//     {
//         return res.json({Msg:"filmId not found"}) 
//     }

//     const findScreen = await screenModel.findById(screenId)
//     if(!findScreen)
//     {
//         return res.json({Msg:"screenId not found"}) 
//     }

//     const findCategory = await catModel.findById(categoryId)
//     if(!findCategory)
//     {
//         return res.json("categoryId not found")
//     }

//    const nameofFilm = await detailsModel.findOne({_id:filmDetId,filmName})
//    if(!nameofFilm)
//    {
//     return res.json("not the same name of related film")
//    }

//     if(Date.parse(day) < Date.now())
//     {
//         return res.json("wrong day")
//     }

//     let fulldate = day + " " + startTime // nshoof keda ynf3 wla l2

//     let ss = startTime.split(" ")[1]
//     console.log({ss})
//     console.log({fulldate})

//     if(Date.parse(fulldate) < Date.now())
//     {
//         return res.json("wrong time")
//     }
// // check about startTime


// // get all films having the same screen and same day and same startTime
// const findFilm2 = await filmModel.findOne({day,screenId,startTime})
// if(findFilm2)
// {
//     return res.json("there is a film with the same start hours in the same screen")
// }

// // get all films having the same screen and same day
// const findFilm3 = await filmModel.find({day,screenId})
// if(findFilm3 > 0)
// {
//     return res.json("there is a film with the same start hours in the same screennn")
// }
// // belongs to startTime
// let fullStartDate =  day + " " + startTime 
// console.log({fullStartDate})
// for (const time of findFilm3) {
//     if(Date.parse(fullStartDate) >= Date.parse(time.fullStartDate) && Date.parse(fullStartDate) <= Date.parse(time.fullEndDate))
//     {
//         return res.json(`u need to put startTime after this date ${time.fullEndDate}`)
//     }
// }
// // hours
// let startHours = startTime.split(":")[0]
// let durationHours = findFilm.duration.split(":")[0]
// console.log({durationHours});
// let sumofHours = 0
// // if sum of hours > 12 
//     if(Number(startHours) + Number(durationHours) > 12)
//     {
//          sumofHours =( Number(startHours) + Number(durationHours)) - 12
//     }
//     else{
//          sumofHours =( Number(startHours) + Number(durationHours))
//     }


//     // n3ml minutes
//     let StartMinutes = startHours.split(" ")[0]
//     let durationMinutes = findFilm.duration.split(":")[1]
//     console.log(StartMinutes,{durationMinutes});
//     let sumofMinutes = 0
//     if(Number(StartMinutes) + Number(durationMinutes) >= 60)
//     {
//          sumofMinutes = Number(StartMinutes) + Number(durationMinutes) - 60
//     }
//     else{
//          sumofMinutes = Number(StartMinutes) + Number(durationMinutes)
//     }

//     console.log({sumofMinutes});
//     console.log(startTime.split(" ")[1]);
// // belongs to endTime
// let fullEndDate =day + " " + sumofHours + ":" + sumofMinutes + " " + startTime.split(" ")[1]
// console.log({fullEndDate})
//     for (const time of findFilm3) {
//         if(Date.parse(fullEndDate) >= Date.parse(time.fullStartDate) && Date.parse(fullEndDate) <= Date.parse(time.fullEndDate) )
//         {
//             return res.json(`u neeeeeed to put startTime after this date ${time.fullEndDate}`)
//         }
//     }






//     numOfTickets = findScreen.seatsA + findScreen.seatsB + findScreen.seatsC + findScreen.seatsD + findScreen.seatsE + findScreen.seatsF
//     console.log({numOfTickets})
//     console.log(req.body.seatA.seatsA.length,req.body.seatB.seatsB?.length)

//     if(req.body.seatA.seatsA.length != findScreen.seatsA)
//     {
//         return res.json("wrong num of seats in A ")
//     }
//     if(seatsB || findScreen.seatsB > 0)
//     {
//         if(seatsB?.length != findScreen.seatsB)
//         {
//             return res.json("wrong num of seats in B ")
//         }
//     }
//     if(seatsC || findScreen.seatsC > 0)
//     {
//         if(seatsC?.length != findScreen.seatsC)
//     {
//         return res.json("wrong num of seats in C ")
//     }
//     }
//     if(seatsD || findScreen.seatsD > 0)
//     {
//         if(seatsD?.length != findScreen.seatsD)
//     {
//         return res.json("wrong num of seats in D ")
//     }
//     }
    
//     if(seatsE || findScreen.seatsE > 0)
//     {
//         if(seatsE?.length != findScreen.seatsE)
//     {
//         return res.json("wrong num of seats in E ")
//     }
//     }

//     if(seatsF || findScreen.seatsF > 0)
//     {
//         if(seatsF?.length != findScreen.seatsF)
//         {
//             return res.json("wrong num of seats in F ")
//         }
//     }
    
// // N7AWEL n3mlha btaree2a tanya 7etet elseats
//     const film = await filmModel.create({'availableSeats.seatA.seatsA':seatsA,'availableSeats.seatA.seatAlpha':seatAlpha,
//     'availableSeats.seatB.seatsB':seatsB,'availableSeats.seatB.seatAlpha':seatAlpha,
//     'availableSeats.seatC.seatsC':seatsC,'availableSeats.seatC.seatAlpha':seatAlpha,
//     'availableSeats.seatD.seatsD':seatsD,'availableSeats.seatD.seatAlpha':seatAlpha,
//     'availableSeats.seatE.seatsE':seatsE,'availableSeats.seatE.seatAlpha':seatAlpha,
//     'availableSeats.seatF.seatsF':seatsF,'availableSeats.seatF.seatAlpha':seatAlpha,
//     numOfTickets,startTime,endTime,fullStartDate,fullEndDate,day,filmDetId,screenId,filmName,categoryId
// })
// // const film = await filmModel.create(req.body)
   
//     return res.json("film added")

   // ******** fadel bas lma tkoon 7aflt 12 w hy2lb tany youm m7tageen nktb elyoum elb3deeh


})

// haseeb 7etet duration deh l bokra => hzwd 7eta lel AM w PM w 23ml conditions lel endtime w lw
//  lw feeh filmeen wara b3d fe nafs el screen lazm startTime bta3 eltany yb2a b3d nos sa3a mn endtime bta3 el awl


// export const addReservation2 = asyncHandler( async (req,res,next)=>{

//     let {filmName,numOfTickets,day,startTime,endTime,filmDetId,screenId,categoryId,seatsA,seatsB,seatsC,seatsD,seatsE,seatsF} = req.body

// // console.log({day})
// //     day = new Date(day)
// //     day.setDate(day.getDate()+1)
// //     console.log({day})


//     const findFilm = await detailsModel.findById(filmDetId)
//     if(!findFilm)
//     {
//         return res.json({Msg:"filmId not found"}) 
//     }

//     const findScreen = await screenModel.findById(screenId)
//     if(!findScreen)
//     {
//         return res.json({Msg:"screenId not found"}) 
//     }

//     const findCategory = await catModel.findById(categoryId)
//     if(!findCategory)
//     {
//         return res.json("categoryId not found")
//     }

//    const nameofFilm = await detailsModel.findOne({_id:filmDetId,filmName})
//    if(!nameofFilm)
//    {
//     return res.json("not the same name of related film")
//    }

//     if(Date.parse(day) < Date.now())
//     {
//         return res.json("wrong day")
//     }

//     let fulldate = day + " " + startTime // nshoof keda ynf3 wla l2

//     let ss = startTime.split(" ")[1]
//     console.log({ss})
//     console.log({fulldate})

//     if(Date.parse(fulldate) < Date.now())
//     {
//         return res.json("wrong time")
//     }
// // check about startTime


// // get all films having the same screen and same day and same startTime
// const findFilm2 = await filmModel.findOne({day,screenId,startTime})
// if(findFilm2)
// {
//     return res.json("there is a film with the same start hours in the same screen")
// }

// // get all films having the same screen and same day
// const findFilm3 = await filmModel.find({day,screenId})
// if(findFilm3 > 0)
// {
//     return res.json("there is a film with the same start hours in the same screennn")
// }
// // belongs to startTime
// let fullStartDate =  day + " " + startTime 
// console.log({fullStartDate})
// for (const time of findFilm3) {
//     if(Date.parse(fullStartDate) >= Date.parse(time.fullStartDate) && Date.parse(fullStartDate) <= Date.parse(time.fullEndDate))
//     {
//         return res.json(`u need to put startTime after this date ${time.fullEndDate}`)
//     }
// }
// // hours
// let startHours = startTime.split(":")[0]
// let durationHours = findFilm.duration.split(":")[0]
// console.log({durationHours});
// let sumofHours = 0
// // if sum of hours > 12 
// // hena b3ml sum of hours w b3mlohom - 12 lw homa aktr mn 12 3shan arg3hom lel sa3a mazboota
//     if(Number(startHours) + Number(durationHours) > 12)
//     {
//          sumofHours =( Number(startHours) + Number(durationHours)) - 12
//     }
//     else{
//          sumofHours =( Number(startHours) + Number(durationHours))
//     }// nshoof badal deh brdo function fel express taba3 Date ynf3 t3mlha wla l2


//     // n3ml minutes
//     let StartMinutes = startHours.split(" ")[0]
//     let durationMinutes = findFilm.duration.split(":")[1]
//     console.log(StartMinutes,{durationMinutes});
//     let sumofMinutes = 0
//     // hena b3ml sum of minutes w b3mlohom - 60 lw homa aktr mn 60 3shan arg3hom lel sa3a mazboota
//     if(Number(StartMinutes) + Number(durationMinutes) >= 60)
//     {
//          sumofMinutes = Number(StartMinutes) + Number(durationMinutes) - 60
//     }
//     else{
//          sumofMinutes = Number(StartMinutes) + Number(durationMinutes)
//     }

//     console.log({sumofMinutes});
//     console.log(startTime.split(" ")[1]);
// // belongs to endTime
// let fullEndDate = day + " " + sumofHours + ":" + sumofMinutes + " " + startTime.split(" ")[1]
// console.log({fullEndDate})
//     for (const time of findFilm3) {
//         if(Date.parse(fullEndDate) >= Date.parse(time.fullStartDate) && Date.parse(fullEndDate) <= Date.parse(time.fullEndDate) )
//         {
//             return res.json(`u neeeeeed to put startTime after this date ${time.fullEndDate}`)
//         }
//     }






//     numOfTickets = findScreen.seatsA + findScreen.seatsB + findScreen.seatsC + findScreen.seatsD + findScreen.seatsE + findScreen.seatsF
//     console.log({numOfTickets})
//     console.log(req.body.seatA.seatsA.length,req.body.seatB.seatsB?.length)


//     if(req.body.seatA){
   
//         if(req.body.seatA.seatsA.length != findScreen.seatsA)
//     {
//         return res.json("wrong num of seats in A ")
//     }
//     }
//     if(req.body.seatB){

//     if(req.body.seatB.seatsB || findScreen.seatsB > 0)
//     {
//         if(req.body.seatB.seatsB?.length != findScreen.seatsB)
//         {
//             return res.json("wrong num of seats in B ")
//         }
//     }
//     }
//     if(req.body.seatC){ 
        
//         if(req.body.seatC.seatsC || findScreen.seatsC > 0)
//     {
//         if(req.body.seatC.seatsC?.length != findScreen.seatsC)
//     {
//         return res.json("wrong num of seats in C ")
//     }
//     }
//     }

//     if(req.body.seatD)
//     {
//     if(req.body.seatD.seatsD || findScreen.seatsD > 0)
//     {
//         if(req.body.seatD.seatsD?.length != findScreen.seatsD)
//     {
//         return res.json("wrong num of seats in D ")
//     }
//     }
//     }
//     if(req.body.seatE){
//     if(req.body.seatE.seatsE || findScreen.seatsE > 0)
//     {
//         if(req.body.seatE.seatsE?.length != findScreen.seatsE)
//     {
//         return res.json("wrong num of seats in E ")
//     }
//     }
// }
//     if(req.body.seatF)
//    { if(req.body.seatF.seatsF || findScreen.seatsF > 0)
//     {
//         if(req.body.seatF.seatsF?.length != findScreen.seatsF)
//         {
//             return res.json("wrong num of seats in F ")
//         }
//     }
//     }
// // N7AWEL n3mlha btaree2a tanya 7etet elseats
// //     const film = await filmModel.create({'availableSeats.seatA.seatsA':req.body.seatA.seatsA,
// //     'availableSeats.seatB.seatsB':req.body.seatB.seatsB,
// //     'availableSeats.seatC.seatsC':req.body.seatC.seatsC,
// //     'availableSeats.seatD.seatsD':req.body.seatD.seatsD,
// //     'availableSeats.seatE.seatsE':req.body.seatE.seatsE,
// //     'availableSeats.seatF.seatsF':req.body.seatF.seatsF,
// //     numOfTickets,startTime,endTime,fullStartDate,fullEndDate,day,filmDetId,screenId,filmName,categoryId
// // })
// // const film = await filmModel.create(req.body)
   
//     return res.json("film added")

//    // ******** fadel bas lma tkoon 7aflt 12 w hy2lb tany youm m7tageen nktb elyoum elb3deeh


// })

export const addReservation2 = asyncHandler( async (req,res,next)=>{

    let {filmName,numOfTickets,day,startTime,endTime,filmDetId,screenId,categoryId,seatsA,seatsB,seatsC,seatsD,seatsE,seatsF} = req.body

// console.log({day})
//     day = new Date(day)
//     day.setDate(day.getDate()+1)
//     console.log({day})



    const findFilm = await detailsModel.findById(filmDetId)
    if(!findFilm)
    {
        return res.json({Msg:"filmId not found"}) 
    }

    const findScreen = await screenModel.findById(screenId)
    if(!findScreen)
    {
        return res.json({Msg:"screenId not found"}) 
    }

    const findCategory = await catModel.findById(categoryId)
    if(!findCategory)
    {
        return res.json("categoryId not found")
    }

   const nameofFilm = await detailsModel.findOne({_id:filmDetId,filmName})
   if(!nameofFilm)
   {
    return res.json("not the same name of related film")
   }

    if(Date.parse(day) < Date.now())
    {
        return res.json("wrong day")
    }

    let fulldate = day + " " + startTime // nshoof keda ynf3 wla l2

    let ss = startTime.split(" ")[1]
    console.log({ss})
    console.log({fulldate})

    if(Date.parse(fulldate) < Date.now())
    {
        return res.json("wrong time")
    }
// check about startTime


// get all films having the same screen and same day and same startTime
const findFilm2 = await filmModel.findOne({day,screenId,startTime})
if(findFilm2)
{
    return res.json("there is a film with the same start hours in the same screen")
}

// get all films having the same screen and same day
const findFilm3 = await filmModel.find({day,screenId})
if(findFilm3 > 0)
{
    return res.json("there is a film with the same start hours in the same screennn")
}
// belongs to startTime
console.log({day})
let Day = new Date(day)
Day.setDate(Day.getDate())
console.log({Day})
console.log({startTime})
let fullStartDate =  Day + " " + startTime 
console.log({fullStartDate})
for (const time of findFilm3) {
    if(Date.parse(fullStartDate) >= Date.parse(time.fullStartDate) && Date.parse(fullStartDate) <= Date.parse(time.fullEndDate))
    {
        return res.json(`u need to put startTime after this date ${time.fullEndDate}`)
    }
}
// hours
let startHours = startTime.split(":")[0]
let durationHours = findFilm.duration.split(":")[0]
console.log({durationHours});
let sumofHours = 0
// if sum of hours > 12 
// hena b3ml sum of hours w b3mlohom - 12 lw homa aktr mn 12 3shan arg3hom lel sa3a mazboota
let isPm 
let isAm
let newDay 
console.log("gg")


console.log(startTime.split(" ")[1])
//     if(Number(startHours) + Number(durationHours) > 12)
//     {
//          sumofHours =( Number(startHours) + Number(durationHours)) - 12
//          if(startTime.split(" ")[1] == 'AM')
//          {
//             isPm = "PM"
           
//          }
//          else if(startTime.split(" ")[1] == 'PM')
//          {
//             isAm = "AM"
// console.log({isAm})
//             console.log({day})
//             newDay = new Date(day)
//             newDay.setDate(newDay.getDate()+1)
//             console.log({newDay})
//          }
//     }
//     else{
//          sumofHours =( Number(startHours) + Number(durationHours))
//     }// nshoof badal deh brdo function fel express taba3 Date ynf3 t3mlha wla l2


    // calculate sum of minutes =============
    let StartMin = startTime.split(" ")[0]
    let StartMinutes = StartMin.split(":")[1]
    let durationMinutes = findFilm.duration.split(":")[1]
    console.log({StartMinutes},{durationMinutes});
    let sumofMinutes = 0
    // hena b3ml sum of minutes w b3mlohom - 60 lw homa aktr mn 60 3shan arg3hom lel sa3a mazboota
    if(Number(StartMinutes) + Number(durationMinutes) >= 60)
    {
         sumofMinutes = Number(StartMinutes) + Number(durationMinutes) - 60
         durationHours =  Number(durationHours) + 1
         console.log({durationHours})
         if(sumofMinutes < 10)
         {
            sumofMinutes = '0' + sumofMinutes
         }
    }
    else{
         sumofMinutes = Number(StartMinutes) + Number(durationMinutes)
    }

// calculate sum of hours ===========
    if(Number(startHours) + Number(durationHours) > 12)
    {
         sumofHours =( Number(startHours) + Number(durationHours)) - 12
         if(startTime.split(" ")[1] == 'AM')
         {
            isPm = "PM"
           
         }
         else if(startTime.split(" ")[1] == 'PM')
         {
            isAm = "AM"
console.log({isAm})
            // console.log({Day})
            // newDay = new Date(Day)
            // newDay.setDate(newDay.getDate()+1)
            // console.log({newDay})
            console.log({Day})
            newDay = new Date(fulldate)
            newDay.setDate(newDay.getDate()+1)
            console.log({newDay})
         }
    }
    else{
         sumofHours =( Number(startHours) + Number(durationHours))
    }// nshoof badal deh brdo function fel express taba3 Date ynf3 t3mlha wla l2

console.log({sumofHours})


    console.log({sumofMinutes});
    console.log(startTime.split(" ")[1]);
// belongs to endTime
let gg =  sumofHours + ":" + sumofMinutes + " " +( isAm || isPm || startTime.split(" ")[1])
console.log({gg})
let fullEndDate = newDay.toLocaleDateString() || Day + " " + gg 
console.log({fullEndDate})
    for (const time of findFilm3) {
        if(Date.parse(fullEndDate) >= Date.parse(time.fullStartDate) && Date.parse(fullEndDate) <= Date.parse(time.fullEndDate) )
        {
            return res.json(`u neeeeeed to put startTime after this date ${time.fullEndDate}`)
        }
    }






    numOfTickets = findScreen.seatsA + findScreen.seatsB + findScreen.seatsC + findScreen.seatsD + findScreen.seatsE + findScreen.seatsF
    console.log({numOfTickets})
    console.log(req.body.seatA.seatsA.length,req.body.seatB.seatsB?.length)


    if(req.body.seatA){
   
        if(req.body.seatA.seatsA.length != findScreen.seatsA)
    {
        return res.json("wrong num of seats in A ")
    }
    }
    if(req.body.seatB){

    if(req.body.seatB.seatsB || findScreen.seatsB > 0)
    {
        if(req.body.seatB.seatsB?.length != findScreen.seatsB)
        {
            return res.json("wrong num of seats in B ")
        }
    }
    }
    if(req.body.seatC){ 
        
        if(req.body.seatC.seatsC || findScreen.seatsC > 0)
    {
        if(req.body.seatC.seatsC?.length != findScreen.seatsC)
    {
        return res.json("wrong num of seats in C ")
    }
    }
    }

    if(req.body.seatD)
    {
    if(req.body.seatD.seatsD || findScreen.seatsD > 0)
    {
        if(req.body.seatD.seatsD?.length != findScreen.seatsD)
    {
        return res.json("wrong num of seats in D ")
    }
    }
    }
    if(req.body.seatE){
    if(req.body.seatE.seatsE || findScreen.seatsE > 0)
    {
        if(req.body.seatE.seatsE?.length != findScreen.seatsE)
    {
        return res.json("wrong num of seats in E ")
    }
    }
}
    if(req.body.seatF)
   { if(req.body.seatF.seatsF || findScreen.seatsF > 0)
    {
        if(req.body.seatF.seatsF?.length != findScreen.seatsF)
        {
            return res.json("wrong num of seats in F ")
        }
    }
    }
// N7AWEL n3mlha btaree2a tanya 7etet elseats
//     const film = await filmModel.create({'availableSeats.seatA.seatsA':req.body.seatA.seatsA,
//     'availableSeats.seatB.seatsB':req.body.seatB.seatsB,
//     'availableSeats.seatC.seatsC':req.body.seatC.seatsC,
//     'availableSeats.seatD.seatsD':req.body.seatD.seatsD,
//     'availableSeats.seatE.seatsE':req.body.seatE.seatsE,
//     'availableSeats.seatF.seatsF':req.body.seatF.seatsF,
//     numOfTickets,startTime,endTime,fullStartDate,fullEndDate,day:Day,filmDetId,screenId,filmName,categoryId
// })
// const film = await filmModel.create(req.body)
   
    return res.json("film added")

   // ******** fadel bas lma tkoon 7aflt 12 w hy2lb tany youm m7tageen nktb elyoum elb3deeh -> done

   // ***************el na2es ashoof elfar2 mabeen fullEndDate fel AM wel PM bas

})

export const updateFilm = asyncHandler(async(req,res,next)=>{

    let {day,startTime,endTime,filmDetId,screenId,seatsA,seatsB,seatsC,seatsD,seatsE,seatsF} = req.body

    const findScreen = await screenModel.findById(screenId)
    if(!findScreen)
    {
        return res.json({Msg:"screenId not found"}) 
    }

    const findFilmDet = await detailsModel.findById(filmDetId)
    if(!findFilmDet)
    {
        return res.json({Msg:"filmDetId not found"}) 
    }

    const findFilm = await filmModel.findById(filmId)
    if(!findFilm)
    {
        return res.json({Msg:"filmId not found"}) 
    }
    // after checking all of ids
    if(startTime)
    {
        let fullStartDate = findFilm.day + " " + startTime
        for (const time of findFilm) {
            if(Date.parse(fullStartDate) >= Date.parse(time.fullStartDate) && Date.parse(fullStartDate) <= Date.parse(time.fullEndDate))
            {
                return res.json(`u need to put startTime after this date ${time.fullEndDate}`)
            }
        }
        
        // Calculation of hours
        let startHours = startTime.split(":")[0]
        let durationHours = findFilmDet.duration.split(":")[0]
        let sumofHours = Number(startHours) + Number(durationHours)

        //Calculation of hours 
        let StartMinutes = startTime.split(":")[1] 
        let minutes = StartMinutes.split(" ")[0]
        let sumofMinutes = Number(minutes)  + Number(findFilmDet.duration.split(":")[1])

        let fullEndDate = findFilm.day + " " + sumofHours + ":" + sumofMinutes + StartMinutes.split(" ")[1]
        for (const time of findFilm) {
            if(Date.parse(fullEndDate) >= Date.parse(time.fullStartDate) && Date.parse(fullEndDate) <= Date.parse(time.fullEndDate) )
            {
                return res.json(`u neeeeeed to put startTime after this date ${time.fullEndDate}`)
            }
        }
       // findFilm.startTime = startTime
       findFilm.startTime = startTime
       findFilm.fullStartDate = fullStartDate
       findFilm.fullEndDate = fullEndDate
        findFilm.save()
    }
    // condition => lw 3amalt startTime ynf3 fe youm tany lakn mynf3sh fel youm el ana kont 7ato feeh***
    // fana keda lazm lw user da5al day tany ynf3 feeh => keda lazm 23mlohom update fe nafs elwa2t*****  
    if(day) // fadel dayyyyy
    {
        if(Date.parse(day) < Date.now())
        {
            return res.json("wrong date")
        }
    }
   

    

})

// add-update-getAvailableFilmForBooking -> like site 
// ngeblo day w startTime w screen w screenType
export const getAvailableFilmForBooking = asyncHandler(async(req,res,next)=>{

    const {filmId,day,startTime} = req.body

    const findFilm = await filmModel.findById(filmId)
    if(!findFilm)
    {
        return res.json("filmId not found")
    }

    const findDays = await filmModel.find({id:filmId,day}).select("day") // ngeeb min 2
    if(!findDays)
    {
        return res.json("no days available")
    }

    const findTime = await filmModel.find({id:filmId,startTime,day}).select("startTime")
    if(!findTime)
    {
        return res.json("no time available")
    }
// n3ml populate ngeeb screens mn id bta3ha


return res.json("go to booking screen")


})


export const getAvailableSeats = asyncHandler(async(req,res,next)=>{
    const {filmId} = req.params

     const findFilm = await filmModel.findById(filmId).select("availableSeats")
    // const findFilm = await filmModel.findById(filmId).populate([{
    //     path:"categoryId",
    //     select:"cinemaType"
    // }]).select('cinemaType')
    if(!findFilm)
    {
        return res.json("filmId not found")
    }

    return res.json({findFilm})
})