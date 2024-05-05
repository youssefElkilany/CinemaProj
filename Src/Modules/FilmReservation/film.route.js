import { Router } from "express";
import * as filmController from "./Controller/film.js"
const router = Router()

router.route("/")
.get(filmController.getAvailableFilms)
.post(filmController.addReservation2)
.put(filmController.updateFilm)
.delete()

router.get("/all",filmController.getAllFilms)
router.get("/seats/:filmId",filmController.getAvailableSeats)
export default router