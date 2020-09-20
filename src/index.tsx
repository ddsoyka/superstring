import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './component/App';
import * as State from './state';
import Language from './api/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const { Store, setLanguage } = State;

const language = localStorage.getItem('language');

if (language) Store.dispatch(setLanguage(language as Language));

ReactDOM.render(
    <ReactRedux.Provider store={Store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('root')
);

serviceWorker.register();
