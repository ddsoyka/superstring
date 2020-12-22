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
import RandomImage from '../feature/random/RandomImage';
import LanguageSelector from '../feature/i18n/LanguageSelector';
import NotFound from '../page/NotFound';
import Errors from '../feature/error/Error';
import Download from '../feature/file/Download';
import Convert from '../feature/convert/Convert';
import CalculatorElectrical from '../feature/calculator/CalculatorElectrical';
import './App.css';

const App: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Navigation />
            <main>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/help" component={Help} />
                    <Route path="/random" exact component={Random}/>
                    <Route path="/random/string" component={RandomString} />
                    <Route path="/random/words" component={RandomWords} />
                    <Route path="/random/image" component={RandomImage} />
                    <Route path="/convert" exact component={Convert} />
                    <Route path="/calculator/electrical" component={CalculatorElectrical} />
                    <Route path="/" exact component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </main>
            <Errors />
            <Download />
            <LanguageSelector />
        </Router>
    );
}

export default App;
