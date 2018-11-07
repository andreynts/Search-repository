import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

export default (rootReducer, rootSaga) => {
    const middleware = []
    const enhancers = []

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    enhancers.push(applyMiddleware(...middleware))

    const createAppropriateStore = createStore
    const store = createAppropriateStore(rootReducer, compose(...enhancers))

    sagaMiddleware.run(rootSaga)
    return store
}