import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import Store, * as State from './app/store';
import Language from './api/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const language = localStorage.getItem('language');

if (language) Store.dispatch(State.setLanguage(language as Language));

ReactDOM.render(
    <ReactRedux.Provider store={Store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('root')
);

serviceWorker.register();
