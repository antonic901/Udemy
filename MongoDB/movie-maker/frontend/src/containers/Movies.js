import Movie from '../components/Movie';
import { useQuery } from '@apollo/client';
import { allMovies } from '../queries/queries'

const Movies = () => {
    const {loading, error, data } = useQuery(allMovies);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className='movies'>
            {data.movies.map((movie) => {
                return <Movie key={movie.id}
                    name={movie.name}
                    genre={movie.genre}
                    year={movie.year}
                    image={movie.image}/>
            })}
        </div>
    );
}

export default Movies;