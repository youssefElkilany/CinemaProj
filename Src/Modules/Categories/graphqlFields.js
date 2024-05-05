import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { categoryType } from "../../../GraphQl/Types.js";
import * as categoryController from "./Controller/Category.js"

export const categoryFields = {
   getAllCategory:{ // esm request
       type: new GraphQLList(categoryType),
       resolve: categoryController.getAllCategories

   },

   getCategory:{
    type:categoryType,
    args:{
        cinemaType:{type:new GraphQLNonNull(GraphQLString)}
    },
    resolve: categoryController.getCategory
   }
}