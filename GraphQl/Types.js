import { GraphQLInt,  GraphQLString,GraphQLObjectType, GraphQLList } from "graphql";

export const categoryType = new GraphQLObjectType({
    name:"category",
    fields:{
        cinemaType:{type: GraphQLString},
        price:{type:GraphQLInt}
    }
})


export const screenType = new GraphQLObjectType({
    name:"screen",
    fields:{
        screenName:{type: GraphQLString},
        categoryId:{type:GraphQLString},
        seatsA:{type:GraphQLInt},
        seatsB:{type:GraphQLInt},
        seatsC:{type:GraphQLInt},
        seatsD:{type:GraphQLInt},
        seatsE:{type:GraphQLInt},
        seatsF:{type:GraphQLInt}
        
    }
})

export const filmDetailsType = new GraphQLObjectType({
    name:"filmDetails",
    fields:{
        filmName:{type: GraphQLString},
        duration:{type:GraphQLString},
        actors:{type:new GraphQLList( GraphQLString)},
        writers:{type:new GraphQLList( GraphQLString)},
        directors:{type:new GraphQLList( GraphQLString)},
        genre:{type:new GraphQLList( GraphQLString)},
        releaseDate:{type: GraphQLString},
        rating:{type: GraphQLInt},
        image:{type:new  GraphQLObjectType({
            name:"image",
            fields:{
                public_id:{type: GraphQLString},
                secure_url:{type: GraphQLString}
            }
        })},
        trailer:{type:new GraphQLObjectType({
            name:"trailer",
            fields:{
                public_id:{type: GraphQLString},
                secure_url:{type: GraphQLString}
            }
        })},
        photos:{type:new GraphQLList(new GraphQLObjectType({
            name:"photos",
            fields:{
                public_id:{type: GraphQLString},
                secure_url:{type: GraphQLString}
            }
        }))},
    }
})


const availableSeatsType = new GraphQLObjectType({
    name:"availableSeats",
    fields:{
        seatA:{type:new GraphQLObjectType({
            name:"seatA",
            fields:{
                seatsA:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
        seatB:{type:new GraphQLObjectType({
            name:"seatB",
            fields:{
                seatsB:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
        seatC:{type:new GraphQLObjectType({
            name:"seatC",
            fields:{
                seatsC:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
        seatD:{type:new GraphQLObjectType({
            name:"seatD",
            fields:{
                seatsD:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
        seatE:{type:new GraphQLObjectType({
            name:"seatE",
            fields:{
                seatsE:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
        seatF:{type:new GraphQLObjectType({
            name:"seatF",
            fields:{
                seatsF:{type:new GraphQLList(GraphQLString)},
                seatAlpha:{type:GraphQLString}
            }
        })},
    }
})

export const filmReservationType = new GraphQLObjectType({
    name:"film",
    fields:{
        filmName:{type: GraphQLString},
        numOfTickets:{type:GraphQLInt},
        startTime:{type: GraphQLString},
        day:{type: GraphQLString},
        fullStartDate:{type: GraphQLString},
        fullEndDate:{type: GraphQLString},
        filmDetId:{type: GraphQLString},
        screenId:{type: GraphQLString},
        categoryId:{type: GraphQLString},
        availableSeats:{type:availableSeatsType}
    }
})


export const reservationType = new GraphQLObjectType({
    name:"category",
    fields:{
        cinemaType:{type: GraphQLString},
        price:{type:GraphQLInt}
    }
})

export const reservationByUserIdType = new GraphQLObjectType({
    name:"category",
    fields:{
        cinemaType:{type: GraphQLString},
        price:{type:GraphQLInt}
    }
})



