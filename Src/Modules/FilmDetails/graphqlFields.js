import { GraphQLList } from "graphql";
import { filmDetailsType } from "../../../GraphQl/Types.js";
import * as detailsController from "./Controller/details.js"

export const filmDetailsFields = {
    getFilmDetails:{
        type:new GraphQLList(filmDetailsType),
        resolve:detailsController.getfilms
    }
}