import { GraphQLList } from "graphql"
import { filmReservationType } from "../../../GraphQl/Types.js"
import * as filmReserveController from "./Controller/film.js"

export const filmReservationFields = {
    getFilm:{
        type:new GraphQLList(filmReservationType),
        resolve:filmReserveController.getAllFilms
    }
}