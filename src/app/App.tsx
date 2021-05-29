import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MathJax from 'react-mathjax';
import Navigation from '../feature/navigation/Navigation';
import LanguageSelector from '../feature/i18n/LanguageSelector';
import Errors from '../feature/error/Error';
import Download from '../feature/file/Download';
import Router from './Router'

import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navigation />
            <main>
                <MathJax.Provider>
                    <Router />
                </MathJax.Provider>
            </main>
            <Errors />
            <Download />
            <LanguageSelector />
        </BrowserRouter>
    );
};

export default App;
