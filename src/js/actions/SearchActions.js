import axios from 'axios'
const qs = require('query-string')

export const SEARCH_CLICKED = 'SEARCH_CLICKED'
export const BEGIN_SEARCH = 'BEGIN_SEARCH'
export const SEARCH_ERROR = 'SEARCH_ERROR'
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS'

export function beginSearch() {
    return {
        type: BEGIN_SEARCH
    }
}

export function receiveSearchResults(results) {
    return {
        type: RECEIVE_SEARCH_RESULTS,
        payload: results
    }
}

export function searchError(err) {
    return {
        type: SEARCH_ERROR,
        payload: err
    }
}

export function searchClicked() {
    return (dispatch, getState) => {
        dispatch(beginSearch())

        const {tvOrMovie} = getState()

        const selectedGenre = getState().genres.selectedGenre
        const fromReleaseYear = getState().releaseYear.fromReleaseYear
        const toReleaseYear = getState().releaseYear.toReleaseYear

        axios.get(`http://localhost:3000/filim-api/search/${tvOrMovie}?` + qs.stringify({
                selectedGenre,
                fromReleaseYear,
                toReleaseYear
            }))
            .then((response) => {
                dispatch(receiveSearchResults(response.data))
            })
            .catch((err) => {
                dispatch(searchError(err))
            })
    }
}