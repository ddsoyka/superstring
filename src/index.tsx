import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as Utility from './api/utility';
import App from './app/App';
import Store from './app/store';
import Language from './api/Language';
import { setLanguage } from './feature/i18n/i18nSlice';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const language = navigator.language;
const languages = Object.values(Language) as string[];

if (languages.includes(language))
    Store.dispatch(setLanguage(language as Language));
else
    Store.dispatch(setLanguage(Language.UNKNOWN));

Utility.debug(`The browser reports that the current language is ${language}`);
Utility.debug(`The viewport is ${window.innerWidth}x${window.innerHeight}`);

ReactDOM.render(
    <React.StrictMode>
        <ReactRedux.Provider store={Store}>
            <App />
        </ReactRedux.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();

if (process.env.NODE_ENV === `development`) reportWebVitals(console.log);
