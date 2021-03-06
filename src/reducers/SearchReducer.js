import * as a from '../actions/SearchActions'

const initialState = {
    isSearching: false,
    hasSearched: false,
    searchResults: [],
    totalPages: 0
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case a.SEARCH_STARTED:
            return Object.assign({}, state, {
                isSearching: true,
            })
        case a.RECEIVE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                isSearching: false,
                hasSearched: true,
                searchResults: action.payload.results,
                totalPages: action.payload.total_pages
            })
        default:
            return state
    }
}