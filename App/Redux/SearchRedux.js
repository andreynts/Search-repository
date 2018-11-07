import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getSearchRequest: ['q', 'page'],
    getSearchSuccess: ['data'],
    getSearchFailure: ['error']
})

export const SearchTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    results: [],
    status: '',
    fetching: true,
    errorMessage: '',
    error: false
})

export const getSearchRequest = (state, action) => {
    const { data } = action
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getSearchSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', repositories: action.data })
}

export const getSearchFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SEARCH_REQUEST]: getSearchRequest,
    [Types.GET_SEARCH_SUCCESS]: getSearchSuccess,
    [Types.GET_SEARCH_FAILURE]: getSearchFailure
})