import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Help from './Help';
import Random from './Random';
import RandomString from './RandomString';
import RandomWords from './RandomWords';
import LanguageSelector from './LanguageSelector';
import NotFound from './NotFound';
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
        </Router>
    );
}

export default App;
