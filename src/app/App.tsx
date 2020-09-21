import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from 'react-router-dom';
import Navigation from '../feature/navigation/Navigation';
import Home from '../page/Home';
import About from '../page/About';
import Help from '../page/Help';
import Random from '../feature/random/Random';
import RandomString from '../feature/random/RandomString';
import RandomWords from '../feature/random/RandomWords';
import LanguageSelector from '../feature/i18n/LanguageSelector';
import NotFound from '../page/NotFound';
import Errors from '../feature/error/Error';
import './App.css';

const App: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <LanguageSelector />
            <Navigation />
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/help" component={Help} />
                <Route path="/random" exact component={Random}/>
                <Route path="/random/string" component={RandomString} />
                <Route path="/random/words" component={RandomWords} />
                <Route path="/" exact component={Home}/>
                <Route component={NotFound}/>
            </Switch>
            <Errors />
        </Router>
    );
}

export default App;
