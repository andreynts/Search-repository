import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'

import { SearchTypes } from '../Redux/SearchRedux'

//Sagas
import { getAllRepositories } from './SearchSagas'

const api = API.create()

export default function * root() {
    yield [
        takeLatest(SearchTypes.GET_SEARCH_REQUEST, getAllRepositories, api),
    ]
}