import { useEffect, useState } from "react";
import API from '../API';

import { isPersistedState } from "../helpers";


export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchMovie = async () => {
        try {
            setLoading(true);
            setError(false);
            // const movie = await API.fetchMovie(movieId);
            // const credits = await API.fetchCredits(movieId);
            const [credits, movie] = await Promise.all([API.fetchCredits(movieId), API.fetchMovie(movieId)]);
            const directors = credits.crew.filter(member => member.job === 'Director');

            setState({
                ...movie,
                actors: credits.cast,
                directors
            });
            // console.log(state)
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }
    useEffect(() => {
        const sessionState = isPersistedState(movieId);
        if (sessionState) {
            console.log("using sessionstate");
            setState(sessionState);
            setLoading(false);
            return;
        }
        // setState({});
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
        // console.log('setStorage');
    },[movieId, state])

    return { state, loading, error };
}