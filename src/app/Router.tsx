import { Switch, Route } from 'react-router-dom';
import Convert from '../feature/convert/Convert';
import Calculator from '../feature/calculator/Calculator';
import CalculatorElectrical from '../feature/calculator/CalculatorElectrical';
import Analyze from '../feature/analyze/Analyze';
import BinaryVisualizeAnalyze from '../feature/analyze/BinaryVisualizeAnalyze';
import NotFound from '../page/NotFound';
import Home from '../page/Home';
import About from '../page/About';
import Help from '../page/Help';
import Random from '../feature/random/Random';
import RandomString from '../feature/random/RandomString';
import RandomWords from '../feature/random/RandomWords';
import RandomImage from '../feature/random/RandomImage';

const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/help">
                <Help />
            </Route>
            <Route path="/random" exact>
                <Random />
            </Route>
            <Route path="/random/string">
                <RandomString />
            </Route>
            <Route path="/random/words">
                <RandomWords />
            </Route>
            <Route path="/random/image">
                <RandomImage />
            </Route>
            <Route path="/convert" exact>
                <Convert />
            </Route>
            <Route path="/calculator" exact>
                <Calculator />
            </Route>
            <Route path="/calculator/electrical">
                <CalculatorElectrical />
            </Route>
            <Route path="/analyze" exact>
                <Analyze />
            </Route>
            <Route path="/analyze/binary-visualize">
                <BinaryVisualizeAnalyze />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Router;