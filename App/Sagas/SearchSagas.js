import { call, put } from 'redux-saga/effects'
import SearchActions from '../Redux/SearchRedux'

export function * getAllRepositories(api, action) {
    try {
        const response = yield call(api.getRepositories, action)
        console.log("response", response)
        if (response.ok) {
            yield put(SearchActions.getSearchSuccess(response.data.items))
        } else {
            yield put(SearchActions.getSearchFailure('Connection problems :('))
        }
    } catch (error) {
        yield put(SearchActions.getSearchFailure(error.message))
    }
}