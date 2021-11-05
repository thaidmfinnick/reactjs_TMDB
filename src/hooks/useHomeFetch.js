import {useState, useEffect} from 'react';

// API
import API from '../API';

import { isPersistedState } from '../helpers';

const inititalState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(inititalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(searchTerm);


    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            setState(prev => ({
                ...movies, 
                results: 
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    // Initial and search
    useEffect(() => {

        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
            if (sessionState) {
                console.log("using sessionstate");
                setState(sessionState);
                return;
            }
        }
        // console.log("using API");
        setState(inititalState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // Load more 
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false);

    }, [isLoadingMore, searchTerm, state.page])

    // Write in sessionStorage
    useEffect(() => {
        if(!searchTerm) {
            sessionStorage.setItem('homeState', JSON.stringify(state));
            // console.log('setStorage');
        }
    },[searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}