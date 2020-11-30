import React from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    InputGroup,
    Tab,
    Nav
}
from 'react-bootstrap';
import MathJax from 'react-mathjax';
import Wrapper from '../../component/Wrapper';
import * as Calculator from '../../api/calculator';

const MAXIMUM_RESISTANCE = 1000000.0;
const MAXIMUM_CURRENT = 1000000.0;
const MAXIMUM_VOLTAGE = 1000000.0;
const MAXIMUM_POWER = 1000000.0;
const CALCULATE_FAIL_MESSAGE = 'Unable to calculate missing values';

const CalculatorElectrical: React.FC = () => {
    const [key, setKey] = React.useState('calculator');
    const [resistance, setResistance] = React.useState(0.0);
    const [current, setCurrent] = React.useState(0.0);
    const [voltage, setVoltage] = React.useState(0.0);
    const [power, setPower] = React.useState(0.0);
    const [useable, setUseable] = React.useState([false, false, false, false]);

    const calculate = () => {
        if (resistance !== 0.0 && voltage !== 0.0) {
            const i = Calculator.calculateCurrent(undefined, voltage, resistance);
            const p = Calculator.calculatePower(undefined, voltage, resistance);

            if (i && p) {
                setCurrent(i);
                setPower(p);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
        else if (resistance !== 0.0 && current !== 0.0) {
            const v = Calculator.calculateVoltage(undefined, current, resistance);
            const p = Calculator.calculatePower(current, undefined, resistance);

            if (v && p) {
                setVoltage(v);
                setPower(p);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
        else if (resistance !== 0.0 && power !== 0.0) {
            const v = Calculator.calculateVoltage(power, undefined, resistance);
            const i = Calculator.calculateCurrent(power, undefined, resistance);

            if (v && i) {
                setVoltage(v);
                setCurrent(i);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
        else if (current !== 0.0 && voltage !== 0.0) {
            const r = Calculator.calculateResistance(undefined, voltage, current);
            const p = Calculator.calculatePower(current, voltage, undefined);

            if (r && p) {
                setResistance(r);
                setPower(p);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
        else if (current !== 0.0 && power !== 0.0) {
            const v = Calculator.calculateVoltage(power, current, undefined);
            const r = Calculator.calculateResistance(power, undefined, current);

            if (v && r) {
                setVoltage(v);
                setResistance(r);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
        else if (voltage !== 0.0 && power !== 0.0) {
            const i = Calculator.calculateCurrent(power, voltage, undefined);
            const r = Calculator.calculateResistance(power, voltage, undefined);

            if (i && r) {
                setCurrent(i);
                setResistance(r);
            }
            else throw Error(CALCULATE_FAIL_MESSAGE);
        }
    };

    const update = (index: number, active: boolean) => {
        const copy = [...useable];
        copy[index] = active;
        setUseable(copy);
    };

    const reset = () => {
        setResistance(0.0);
        setCurrent(0.0);
        setVoltage(0.0);
        setPower(0.0);
        setUseable([false, false, false, false]);
    };

    const isDisabled = () => {
        let count = 0;

        if (useable[0]) count++;
        if (useable[1]) count++;
        if (useable[2]) count++;
        if (useable[3]) count++;

        return count < 2;
    }

    return (
        <Wrapper>
            <Row className="py-3">
                <Col>
                    <Tab.Container activeKey={key} id="tabs" onSelect={key => setKey(key as string)}>
                        <Wrapper>
                            <Row className="mb-3">
                                <Col className="flex-grow-0 flex-md-grow-1" />
                                <Nav as={Col} variant="tabs">
                                    <Nav.Item className="flex-grow-1">
                                        <Nav.Link eventKey="calculator">Calculator</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-grow-1">
                                        <Nav.Link eventKey="information">Information</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Col className="flex-grow-0 flex-md-grow-1" />
                            </Row>
                            <Row>
                                <Tab.Content as={Col}>
                                    <Tab.Pane eventKey="calculator" title="Calculator">
                                        <Wrapper reverse>
                                            <Row>
                                                <InputGroup as={Col}>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Resistance (<b>Ω</b>)</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        id="resistance"
                                                        type="number"
                                                        min={0.0}
                                                        max={MAXIMUM_RESISTANCE}
                                                        step="any"
                                                        value={resistance}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            setResistance(value);
                                                            update(0, value > 0.0);
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup as={Col}>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Current (<b>A</b>)</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        id="current"
                                                        type="number"
                                                        min={0.0}
                                                        max={MAXIMUM_CURRENT}
                                                        step="any"
                                                        value={current}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            setCurrent(value);
                                                            update(1, value > 0.0);
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup as={Col}>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Voltage (<b>V</b>)</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        id="voltage"
                                                        type="number"
                                                        min={0.0}
                                                        max={MAXIMUM_VOLTAGE}
                                                        step="any"
                                                        value={voltage}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            setVoltage(value);
                                                            update(2, value > 0.0);
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup as={Col}>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Power (<b>W</b>)</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        id="power"
                                                        type="number"
                                                        min={0.0}
                                                        max={MAXIMUM_POWER}
                                                        step="any"
                                                        value={power}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            setPower(value);
                                                            update(3, value > 0.0);
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Row>
                                        </Wrapper>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="information" title="Information">
                                        <MathJax.Provider>
                                            <h1 className="p-3 border-bottom">Ohms</h1>
                                            <br />
                                            <div className="p-3 border">
                                                <MathJax.Node formula={'R = \\frac{V}{I}'} />
                                                <br/>
                                                <MathJax.Node formula={'R = \\frac{V^2}{P}'} />
                                                <br/>
                                                <MathJax.Node formula={'R = \\frac{P}{I^2}'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1 className="p-3 border-bottom">Amps</h1>
                                            <br />
                                            <div className="p-3 border">
                                                <MathJax.Node formula={'I = \\frac{V}{R}'} />
                                                <br/>
                                                <MathJax.Node formula={'I = \\frac{P}{V}'} />
                                                <br/>
                                                <MathJax.Node formula={'I = \\sqrt{\\frac{P}{R}}'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1 className="p-3 border-bottom">Volts</h1>
                                            <br />
                                            <div className="p-3 border">
                                                <MathJax.Node formula={'V = I\\cdot{R}'} />
                                                <br/>
                                                <MathJax.Node formula={'V = \\frac{P}{I}'} />
                                                <br/>
                                                <MathJax.Node formula={'V = \\sqrt{P\\cdot{R}}'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1 className="p-3 border-bottom">Watts</h1>
                                            <br />
                                            <div className="p-3 border">
                                                <MathJax.Node formula={'P = V\\cdot{I}'} />
                                                <br/>
                                                <MathJax.Node formula={'P = \\frac{V^2}{R}'} />
                                                <br/>
                                                <MathJax.Node formula={'P = I^2\\cdot{R}'} />
                                            </div>
                                        </MathJax.Provider>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Wrapper>
                    </Tab.Container>
                </Col>
            </Row>
            <Row className="pb-3 justify-content-center">
                <Col className="flex-grow-0">
                    <Button disabled={isDisabled()} onClick={calculate}>Calculate</Button>
                </Col>
                <Col className="flex-grow-0">
                    <Button variant="secondary" onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default CalculatorElectrical;
