import { Switch, Route } from "react-router-dom";
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
            <Route path="/help" component={Help} />
            <Route path="/random" exact component={Random} />
            <Route path="/random/string" component={RandomString} />
            <Route path="/random/words" component={RandomWords} />
            <Route path="/random/image" component={RandomImage} />
            <Route path="/convert" exact component={Convert} />
            <Route path="/calculator" exact component={Calculator} />
            <Route path="/calculator/electrical" component={CalculatorElectrical} />
            <Route path="/analyze" exact component={Analyze} />
            <Route path="/analyze/binary-visualize" component={BinaryVisualizeAnalyze} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Router;