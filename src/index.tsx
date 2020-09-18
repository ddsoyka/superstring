import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware
}
from 'redux';
import {
    Provider
}
from 'react-redux';
import thunk from 'redux-thunk';
import {
    ReduxLoggerOptions,
    createLogger
}
from 'redux-logger';
import {
    setLanguage
}
from './Actions';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Reducers from './Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Language from './Language';

const options: ReduxLoggerOptions = {
    collapsed: true,
    duration: true
};
const logger = createLogger(options);

const store = createStore(
    Reducers,
    process.env.NODE_ENV === 'development' ?
    applyMiddleware(thunk, logger) :
    applyMiddleware(thunk)
);

const language = localStorage.getItem('language');

if (language) store.dispatch(setLanguage(language as Language))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
