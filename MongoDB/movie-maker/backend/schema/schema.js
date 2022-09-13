const { buildSchema } = require('graphql')

const movieSchema = buildSchema(`
    type Query {
        movies: [Movie],
        movieByName (name: String!): Movie
    }

    type Mutation {
        addMovie(name: String!, genre: String!, year: String!, image: String!): Movie
    }

    type Movie {
        name: String,
        genre: String,
        year: String,
        image: String
    }
`)

module.exports = movieSchema