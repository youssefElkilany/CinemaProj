import detailsModel from "../../../../DB/Models/Film/FilmDetails.js"
import filmModel from "../../../../DB/Models/Film/FilmReservation.js"
import Cloudinary from "../../../Utils/Cloudinary.js"
import { asyncHandler } from "../../../Utils/ErrorHandling.js"


//graphql
export const getfilms = async (req,res,next)=>{

    const Films = await detailsModel.find()

    //return res.json({Msg:"all films",Films})
    return Films
}

export const playingNowFilms = asyncHandler(async(req,res,next)=>{

    const getFilms = await detailsModel.find({status:"now"}).populate([{
        path:"cinemaId",
        select:"cinemaName location"
    }])
    if(!getFilms?.length > 0)
    {
        return next(new Error("we are not showing anything yet"))
    }
    return res.json({Films:getFilms})
})

export const comingSoonFilms = asyncHandler(async(req,res,next)=>{

    const getFilms = await detailsModel.find({status:"soon"}).populate([{
        path:"cinemaId",
        select:"cinemaName location"
    }])
    if(!getFilms?.length > 0)
    {
        return next(new Error("no coming soon films yet"))
    }
    return res.json({Films:getFilms})
})

// hena example lel graphQL lw ana 3ayz ageeb film dah fe category ehh 3n taree2 request tanya 3shan category msh mawgooda fel filmsDetails model
// summary lw 3ayz ageeb information zyada related bel request deh
export const filmsAtSpecificCinema = asyncHandler(async(req,res,next)=>{
   
    const getFilms = await detailsModel.find({cinemaId:req.params.cinemaId}).populate([{
        path:"cinemaId",
        select:"cinemaName location"
    }])
    if(!getFilms?.length > 0)
    {
        return next(new Error("no films found"))
    }
    return res.json({Films:getFilms})
})

export const getfilmss = async (req,res,next)=>{

    const Films = await detailsModel.find()

    return res.status(200).json({Msg:"all films",Films})
}
// mynf3sh ad5l cinemaIds 8eer lma ykoon m3rood w 22ol coming soon
export const addfilmDetails =asyncHandler( async (req,res,next)=>{

    const {filmName,releaseDate,duration,image,trailer,photos,status} = req.body
    let {actors,writers,directors,genre,cinemaIds} = req.body
    console.log({filmName,genre,releaseDate,duration,image,trailer,photos,status,actors,writers,directors})
 
    // spliting them and removing spaces from names to array because inputs in form is taken as strings only 
actors = actors.split(',')
actors = actors.map(actor =>{
   return actor.trim()
})
writers = writers.split(',')
writers = writers.map(writer =>{
    return writer.trim()
 })
directors = directors.split(',')
directors = directors.map(director =>{
    return director.trim()
 })
genre = genre.split(',')
genre = genre.map(genre =>{
    return genre.trim()
 })

 cinemaIds = cinemaIds.split(',')
 cinemaIds = cinemaIds.map(id =>{
     return id.trim()
 })
 cinemaIds = [...new Set(cinemaIds)]

 

    const findFilm = await detailsModel.findOne({filmName})
    if(findFilm)
    {
        return res.json({msg:"film already exist"})
    }
    // mmkn n3ml check en releaseDate my3deesh time bta3 delwa2ty
    // nshoof date elkont 3amlo fel clinic
    if(Date.parse(releaseDate) > Date.now())
    {
        return res.json("wrong release date")
    }

    if(req?.files?.image){
        console.log({files:req.files.image})
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.files.image[0].path,{folder:`films/${filmName}/profilePic`})
        req.body.secure_url = secure_url
        req.body.public_id = public_id
    }
  // actors = actors.join()
//   let uniqueArray = actors.reduce((acc, item) => {
//     if (!acc.includes(item)) {
//         acc.push(item);
//     }
//     return acc;
// }, []);
    actors = [...new Set(actors)]
    console.log({actors})
   writers  = [...new Set(writers)]
  directors = [...new Set(directors)]
  genre = [...new Set(genre)]
  
  //  if no photos or trailer is uploaded
    if(!req.files?.photos?.length && !req.files?.trailer)
    {
        const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url:req.body.secure_url,public_id:req.body.public_id},status,cinemaId:cinemaIds})
        if(!addFilm)
        {
            return next(new Error("nothing is created"))
        }

        return res.json({msg:"film added",addFilm})
    }
    // if he upload photos or trailers
    let images = []
    if(req.files.photos)
    {
        
    for (const photos of req.files?.photos) {
        const {secure_url,public_id} = await Cloudinary.uploader.upload(photos.path,{folder:`films/${filmName}/photos`})
        images.push({secure_url,public_id})
    }
    }
   
    if(req.files?.photos?.length && !req.files.trailer?.length)
    {
        const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url:req.body.secure_url,public_id:req.body.public_id},photos:images,status,cinemaId:cinemaIds})
        return res.json({msg:"film added",addFilm})
    }

    let videos = []
    for (const video of req.files?.trailer) {
        console.log({video})
        const {secure_url,public_id} = await Cloudinary.uploader.upload(video.path,{resource_type:"video",folder:`films/${filmName}/trailer`})
        videos.push({secure_url,public_id})
    }

    const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url:req.body.secure_url,public_id:req.body.public_id},photos:images,trailer:videos,status,cinemaId:cinemaIds})
        return res.json({msg:"film added",addFilm})

})

export const updateFilmDetails =asyncHandler( async (req,res,next)=>{

    const {filmId,filmName,actors,writers,directors,genre,releaseDate,duration,image,status} = req.body

    const findFilm = await detailsModel.findById(filmId)
    if(!findFilm)
    {
        return res.json({Msg:"filmId not found"})
    }
    console.log({trailer:findFilm.trailer[0]})

    if(filmName)
    {
        // 3ayz hena lma yeegy y8yr filmName y8yr kol names el feeha filmDetailsId eltab3ha
        const checkname = await detailsModel.findOne({filmName})
        if(checkname.filmName == findFilm.filmName)
        {
            return next(new Error("it is the same name"))
        }
        else if(checkname)
        {
            return next(new Error("name already exist"))
        } 
        findFilm.filmName = filmName
       await findFilm.save()
        const relatedFilmNames = await filmModel.updateMany({filmDetId:filmId},{filmName:filmName})
        if(!relatedFilmNames.modifiedCount) // deh m3moola 3shany bas lakn mynf3sh tb2a keda
        {
            return res.json("no related films have been modified")
        }
    }
    if(actors?.length) // hyb2a mo3zmhom addToSet
    {
        // let actor = findFilm.actors
        // actor.push(...new Set(actors))
        // console.log({actor})
        actors.push(...findFilm.actors) 
        console.log({actors})
        const updateActors = await detailsModel.updateOne({_id:filmId},{ $addToSet: { actors: { $each: [...actors] } } })
        if(!updateActors.modifiedCount > 0)
        {
            return next(new Error("nothing updated in actor array"))
        }
        // const updateActors = await detailsModel.updateOne(
        //     { _id: filmId },
        //     { $push: actors }
        //   );
          
        //   if (updateActors.modifiedCount === 0) {
        //     return next(new Error("nothing updated in actor array"));
        //   }
        // findFilm.actors = actor
        // findFilm.save()

    }
    if(writers?.length)
    {
        // let writer = findFilm.writers
        // writer.push(...new Set(writers))
        // findFilm.writers = writer
        // findFilm.save()
        writers.push(...findFilm.writers)
        const updateWriters = await detailsModel.updateOne({_id:filmId},{ $addToSet: { writers: { $each: [...writers] } } })
        if(!updateWriters.modifiedCount > 0)
        {
            return next(new Error("nothing updated in writers array"))
        }
    }
    if(directors?.length)
    {
        // let director = findFilm.directors
        // director.push(...new Set(directors))
        // findFilm.directors = director
        // findFilm.save()

        writers.push(...findFilm.writers)
        const updatedirectors = await detailsModel.updateOne({_id:filmId},{ $addToSet: { directors: { $each: [...directors] } } })
        if(!updatedirectors.modifiedCount > 0)
        {
            return next(new Error("nothing updated in directors array"))
        }

    }
    if(genre?.length)
    {
        // let genres = findFilm.genre
        // genres.push(genres)
        // findFilm.genre = genres
        // findFilm.save()
        genre.push(...findFilm.genre)
        const updateGenre = await detailsModel.updateOne({_id:filmId},{ $addToSet: { genre: { $each: [...genre] } } })
        if(!updateGenre.modifiedCount > 0)
        {
            return next(new Error("nothing updated in actor array"))
        }

    }
    if(releaseDate)
    {
        if(Date.parse(releaseDate) > Date.now())
        {
            return next(new Error("invalid date"))
        }
        findFilm.releaseDate = releaseDate
       await findFilm.save()
    }
    if(duration)
    {
        findFilm.duration = duration
       await findFilm.save()
    }
    if(status)
    {
        findFilm.status = status
        await findFilm.save()
    }
    if(req.files?.image)
    {  
        await Cloudinary.uploader.destroy(findFilm.image.public_id)
        const {secure_url,public_id} = await Cloudinary.uploader.upload(image,{folder:`films/${findFilm.filmName}/profilePic`})
        findFilm.image = {secure_url,public_id}
    }
//     if(photos) // haseeb photos wel trailer b3deen
//     {
// //         let images = findFilm.photos
// //         if(req.files.photos?.length)
// //         {
            
// //             for (const photo of req.files.photos) {
                
// //                 const {secure_url,public_id} = await Cloudinary.uploader.upload(photo,{folder:`films/${findFilm.filmName}`})
// //                 images.push({secure_url,public_id})
// //             }
// //             // to remove old images if user wants
// // for (const oldPhotos of object) {
    
// // }
            
// //             await Cloudinary.uploader.destroy(findFilm.image.public_id)
// //             findFilm.photos = images
// //         }

//     }
// i can add or delete trailer
// this is the delete method => delete one from trailers
   if(req.body.trailerPublic_id)
    {
        // check that public_id is found to delete it
        let getTrailer = findFilm.trailer.find(trailer =>{
            console.log({public_id:trailer.public_id})
            return trailer.public_id == req.body.trailerPublic_id
        })
        if(!getTrailer)
        {
            return next(new Error("public id not found"))
        }
        console.log({public_id2:getTrailer.public_id})
        await Cloudinary.uploader.destroy(getTrailer.public_id) // gg
    }
    // if user wants to add another trailers to film
    if(req.files.trailer)
    {
        /// we will see it later
        // if(findFilm.trailer.length == 2)
        // {
        //     return next(new Error("cant add another trailer"))
        // }
        console.log({trailer:req.files.trailer})
        let videos = []
        videos.push(...findFilm.trailer)
        console.log({videos})
        for (const video of req.files.trailer) {
            const {secure_url,public_id} =  await Cloudinary.uploader.upload(video.path,{resource_type:"video",folder:`films/${filmName}/trailer`})
           // console.log({secure_url,public_id})
            videos.push({secure_url,public_id}) 
            console.log({videos})
            
        }
        
         findFilm.trailer = videos
         await findFilm.save()
        
    }
    return res.json({Msg:"update successfully"})

})


export const deleteFilm = async (req,res,next)=>{

    const removeFilm = await detailsModel.findByIdAndDelete(req.body.id)

    if(!removeFilm)
    {
        return res.json({Msg:"film not deleted"})
    }

    return res.json({msg:"film deleted"})
}