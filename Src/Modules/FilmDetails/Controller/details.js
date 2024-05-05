import detailsModel from "../../../../DB/Models/Film/FilmDetails.js"
import filmModel from "../../../../DB/Models/Film/FilmReservation.js"
import Cloudinary from "../../../Utils/Cloudinary.js"



export const getfilms = async (req,res,next)=>{

    const Films = await detailsModel.find()

    //return res.json({Msg:"all films",Films})
    return Films
}

export const addfilmDetails = async (req,res,next)=>{

    const {filmName,actors,writers,directors,genre,releaseDate,duration,image,trailer,coverImages} = req.body

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
    const {secure_url,public_id} = await Cloudinary.uploader.upload(req.files.image[0].path,{folder:`films/${filmName}`})

    if(!req.files?.photos?.length && !req.files?.trailer)
    {
        const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url,public_id}})

        return res.json({msg:"film added",addFilm})
    }

    let images = []
    for (const photos of req.files.photos) {
        const {secure_url,public_id} = await Cloudinary.uploader.upload(photos.path,{folder:`${filmName}/photos`})
        images.push({secure_url,public_id})
    }
    if(req.files?.photos?.length && !req.files.trailer?.length)
    {
        const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url,public_id},photos:images})
        return res.json({msg:"film added",addFilm})
    }

    let videos = []
    for (const videos of req.files.trailer) {
        const {secure_url,public_id} = await Cloudinary.uploader.upload(videos.path,{resource_type:"video",folder:`${filmName}/photos`})
        videos.push({secure_url,public_id})
    }

    const addFilm = await detailsModel.create({filmName,actors,writers,directors,genre,releaseDate,duration,image:{secure_url,public_id},photos:images,trailer:videos})
        return res.json({msg:"film added",addFilm})

}

export const updateFilmDetails = async (req,res,next)=>{

    const {filmId,filmName,actors,writers,directors,genre,releaseDate,duration,image,trailer,coverImages} = req.body

    const findFilm = await detailsModel.findById(filmId)
    if(!findFilm)
    {
        return res.json("filmId not found")
    }

    if(filmName)
    {
        // 3ayz hena lma yeegy y8yr filmName y8yr kol names el feeha filmDetailsId eltab3ha
        findFilm.filmName = filmName
        findFilm.save()
        const relatedFilmNames = await filmModel.updateMany({filmDetId:filmId},{filmName:filmName})
        if(!relatedFilmNames.modifiedCount) // deh m3moola 3shany bas lakn mynf3sh tb2a keda
        {
            return res.json("no related films have been modified")
        }
    }
    if(actors?.length) // hyb2a mo3zmhom addToSet
    {
        let actor = findFilm.actors
        actor.push(actors)
        findFilm.actors = actor
        findFilm.save()

    }
    if(writers?.length)
    {
        let writer = findFilm.writers
        writer.push(writers)
        findFilm.writers = writer
        findFilm.save()
    }
    if(directors?.length)
    {
        let director = findFilm.directors
        director.push(directors)
        findFilm.directors = director
        findFilm.save()
    }
    if(genre?.length)
    {
        let genres = findFilm.genre
        genres.push(genres)
        findFilm.genre = genres
        findFilm.save()

    }
    if(releaseDate)
    {
        findFilm.releaseDate = releaseDate
        findFilm.save()
    }
    if(duration)
    {
        findFilm.duration = duration
        findFilm.save()
    }
    if(req.files.image)
    {
        let images = findFilm.image
       
        await Cloudinary.uploader.destroy(findFilm.image.public_id)
        const {secure_url,public_id} = await Cloudinary.uploader.upload(image,{folder:`films/${findFilm.filmName}`})
        findFilm.image = {secure_url,public_id} 
                
            
        
    }
    if(photos) // haseeb photos wel trailer b3deen
    {
//         let images = findFilm.photos
//         if(req.files.photos?.length)
//         {
            
//             for (const photo of req.files.photos) {
                
//                 const {secure_url,public_id} = await Cloudinary.uploader.upload(photo,{folder:`films/${findFilm.filmName}`})
//                 images.push({secure_url,public_id})
//             }
//             // to remove old images if user wants
// for (const oldPhotos of object) {
    
// }
            
//             await Cloudinary.uploader.destroy(findFilm.image.public_id)
//             findFilm.photos = images
//         }

    }
    if(trailer)
    {

    }

}


export const deleteFilm = async (req,res,next)=>{

    const removeFilm = await detailsModel.findByIdAndDelete(req.body.id)

    if(!removeFilm)
    {
        return res.json({Msg:"film not deleted"})
    }

    return res.json({msg:"film deleted"})
}