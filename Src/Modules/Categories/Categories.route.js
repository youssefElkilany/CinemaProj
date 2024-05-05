import { Router } from "express";
import * as categoryController from "./Controller/Category.js"
import { categoryType } from "../../../GraphQl/Types.js";
const router = Router()

router.route('/')
//.get(categoryController.getAllCategories)
.post(categoryController.addCategory)
.delete(categoryController.deleteCat)

router.get("/category",categoryController.getCategory)


export default router

