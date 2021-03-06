import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
    const rootReducer = combineReducers({
        search: require('./SearchRedux').reducer
    })

    return configureStore(rootReducer, rootSaga)
}