import { Router } from "express";
import * as cinemaController from "./CinemaController/cinema.js"
const router = Router()

router.route('/')
.get(cinemaController.getCinema)
.post(cinemaController.addCinema)
.put(cinemaController.updateCinema)
.delete(cinemaController.deleteCinema)



export default router