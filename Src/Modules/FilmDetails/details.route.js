import { Router } from "express";
import * as detailsController from "./Controller/details.js"
const router = Router()

router.route('/')
.get(detailsController.getfilms)
.post(detailsController.addfilmDetails)
.put(detailsController.updateFilmDetails)
.delete(detailsController.deleteFilm)



export default router