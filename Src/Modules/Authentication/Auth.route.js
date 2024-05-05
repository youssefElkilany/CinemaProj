import { Router } from "express";
import * as authController from "./Controller/Auth.js"
const router = Router()

router.post("/signup",authController.signUp)
router.post("/login",authController.login)
router.get("/emailConfirmation/:token",authController.confirmationEmail)

router.post("/forgetpass",authController.forgetPassword)

router.post("/signup2",authController.signUp2)
router.post("/login2",authController.login2)