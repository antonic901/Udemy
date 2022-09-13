import { gql } from '@apollo/client';

export const allMovies = gql`
    {
        movies{
            name
            genre
            year
            image
        }
    }
`

export const addMovie = gql`
    mutation AddMovie($name: String!, $genre: String!, $year: String!, $image: String!) {
        addMovie(name: $name, genre: $genre, year: $year, image: $image) {
            name
            genre
            year
            image
        }
    }
`