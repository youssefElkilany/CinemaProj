import { Router } from "express";
import * as screenController from "./Controller/screen.js"
const router = Router()

router.route("/")
.get(screenController.getScreenss)
.post(screenController.addScreen)
.put(screenController.updateScreen)
.delete(screenController.deleteScreen)


export default router