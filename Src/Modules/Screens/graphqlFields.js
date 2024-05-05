import { GraphQLList } from "graphql";
import { screenType } from "../../../GraphQl/Types.js";
import * as screenController from "./Controller/screen.js"
export const screenFields = {
    getScreen : {
        type: new GraphQLList(screenType),
        resolve: screenController.getScreens
    }
}