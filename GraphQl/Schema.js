import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { categoryFields } from "../Src/Modules/Categories/graphqlFields.js";
import { filmDetailsFields } from "../Src/Modules/FilmDetails/graphqlFields.js";
import { screenFields } from "../Src/Modules/Screens/graphqlFields.js";
import { filmReservationFields } from "../Src/Modules/FilmReservation/graphqlFields.js";


export const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:"firstQuery",
        description:"sq",
        fields:{
            getresponse:{
type:GraphQLString,
resolve: ()=>{
    return "hello"
}
            },
            ...categoryFields,
            ...filmDetailsFields,
            ...screenFields,
            ...filmReservationFields
        }
    })
})