import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import Thunk from 'redux-thunk';
import * as Logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import App from './component/App';
import * as State from './state';
import Language from './api/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const middleware = [];

middleware.push(Thunk);

if (process.env.NODE_ENV === `development`) {
    const logger = Logger.createLogger({
        collapsed: true,
        duration: true
    });

    middleware.push(logger);
}

const store = Redux.createStore(State.Reducer, Redux.applyMiddleware(...middleware));
const language = localStorage.getItem('language');

if (language) store.dispatch(State.setLanguage(language as Language));

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('root')
);

serviceWorker.register();
