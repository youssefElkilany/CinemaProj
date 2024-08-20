import express from "express"
import connectDB from "../DB/Connection.js"
import categoryRouter from "./Modules/Categories/Categories.route.js"
import detailsRouter from "./Modules/FilmDetails/details.route.js"
import ScreenRouter from "./Modules/Screens/screen.route.js"
import filmReserve from "./Modules/FilmReservation/film.route.js"
import reserveRouter from "./Modules/Reservation/reserve.route.js"
import AuthRouter from "./Modules/Authentication/Auth.route.js"
import cinemaRouter from "./Modules/Cinema/cinema.route.js"
import { globalErrorHandling } from "./Utils/ErrorHandling.js"
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from "../GraphQl/Schema.js"
const bootstrap =  (app,express)=>{

    app.use(express.json())
    app.use("/graphql",createHandler({schema}))
    app.use("/category",categoryRouter)
    app.use("/details",detailsRouter)
    app.use("/screen",ScreenRouter)
    app.use("/film",filmReserve)
    app.use("/reserve",reserveRouter)
    app.use("/auth",AuthRouter)
    app.use("/cinema",cinemaRouter)
    app.use("*",(req,res,next)=>{
        res.json("gg")
    })
    connectDB()
    app.use(globalErrorHandling)
}

export default bootstrap