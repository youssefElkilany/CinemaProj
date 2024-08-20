import { Router } from "express";
import * as detailsController from "./Controller/details.js"
import { fileUpload, fileValidation } from "../../Utils/Multer.js";
const router = Router()

router.route('/')
.get(detailsController.getfilmss)
.post(fileUpload(...[fileValidation.media]).fields([
    {name:'image',maxCount:1},
    {name:'photos'},
    {name:'trailer',maxCount:2}
]),detailsController.addfilmDetails)
.put(fileUpload(...[fileValidation.media]).fields([
    {name:'image',maxCount:1},
    {name:'photos'},
    {name:'trailer',maxCount:2}
]),detailsController.updateFilmDetails) // hyt7to hena kman images w photos
.delete(detailsController.deleteFilm)

router.get("/soon",detailsController.comingSoonFilms)
router.get("/now",detailsController.playingNowFilms)
router.get("/cinema/:cinemaId",detailsController.filmsAtSpecificCinema)

export default router