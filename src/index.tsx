import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import Store, * as State from './app/store';
import Language from './api/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

console.log(`The viewport is ${window.innerWidth}x${window.innerHeight}`);

const language = navigator.language;

console.log(`The browser reports that the current language is ${language}`);

const languages = Object.values(Language) as string[];

if (languages.includes(language))
    Store.dispatch(State.setLanguage(language as Language));
else
    Store.dispatch(State.setLanguage(Language.UNKNOWN));

ReactDOM.render(
    <ReactRedux.Provider store={Store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('root')
);

serviceWorker.register();
