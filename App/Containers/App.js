import React, {Component} from 'react';
import { Provider } from 'react-redux'
import createStore from '../Redux'
import AppRouter from '../Routes/AppRouter'

const store = createStore()

export default class Home extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
    }
}
