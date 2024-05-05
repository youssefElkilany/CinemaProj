import { Router } from "express";
import * as reserveController from "./Controller/Reservation.js"
const router = Router()

router.route("/")
.get()
.post(reserveController.reserveFilm2)

router.post("/fawry",reserveController.fawry)

export default router