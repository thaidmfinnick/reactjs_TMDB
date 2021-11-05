import React from "react";

// Components 
import Thumbnail from '../Thumbnail';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

// Image
import NoImage from '../../images/no_image.jpg';

// Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';

const MovieInfo = ({ movie, loading }) => (
    <Wrapper backdrop={movie.backdrop_path}>
        <Content>
            <Thumbnail 
                image={
                    movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                }
                clickable={false}
                alt='movie-thumbnail'
            />
            <Text>
                <h1>{movie.title}</h1>
                <h3>PLOT</h3>
                <p>{movie.overview}</p>
                <div className="rating-directors">
                    <div>
                        <h3>RATING</h3>
                        <div className="score">{movie.vote_average}</div>
                    </div>
                    {loading ? 
                        null
                        : (                    
                            <div className="director">
                                <h3>DIRETOR</h3>
                                {movie.directors.map(director => (
                                    <p key={director.credit_id}>{director.name}</p>
                                ))}
                            </div>
                        )
                    }

                </div>
            </Text>
        </Content>
    </Wrapper>
)

export default MovieInfo;