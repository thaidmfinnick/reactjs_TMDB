import React from 'react'
import { useParams } from 'react-router';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// Components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

// Image
import NoImage from '../images/no_image.jpg'

const Movie = () => {   
    const { movieId } = useParams();
    const { state, loading, error } = useMovieFetch(movieId);
    if (error) return <div>Something went wrong ...</div>;
    if (loading) return <Spinner />;
    console.log(state.actors);
    return (
        <>
            <BreadCrumb movieTitle={state.original_title} />
            <MovieInfo movie={state} loading={loading} />
            <MovieInfoBar 
                time={state.runtime}
                budget={state.budget}
                revenue={state.revenue}
            />
            <Grid header='Actors'>
                {loading ? null
                : state.actors.map(actor => (
                    <Actor 
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
}

export default Movie
