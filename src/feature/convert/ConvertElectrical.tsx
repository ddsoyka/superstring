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
import Wrapper from '../../component/Wrapper';
import MathJax from 'react-mathjax';

const MAXIMUM_RESISTANCE = 1000000.0;
const MAXIMUM_CURRENT = 1000000.0;
const MAXIMUM_VOLTAGE = 1000000.0;
const MAXIMUM_POWER = 1000000.0;

const ConvertElectrical: React.FC = () => {
    const [key, setKey] = React.useState('calculator');
    const [resistance, setResistance] = React.useState(0.0);
    const [current, setCurrent] = React.useState(0.0);
    const [voltage, setVoltage] = React.useState(0.0);
    const [power, setPower] = React.useState(0.0);
    const [useable, setUseable] = React.useState([false, false, false, false]);

    const calculate = () => {
        if (resistance !== 0.0 && voltage !== 0.0) {
            setCurrent(voltage / resistance);
            setPower(voltage * current);
        }
        else if (resistance !== 0.0 && current !== 0.0) {
            setVoltage(current * resistance);
            setPower(voltage * current);
        }
        else if (resistance !== 0.0 && power !== 0.0) {
            setVoltage(Math.sqrt(power * resistance));
            setCurrent(power / voltage);
        }
        else if (current !== 0.0 && voltage !== 0.0) {
            setResistance(voltage / current);
            setPower(voltage * current);
        }
        else if (current !== 0.0 && power !== 0.0) {
            setVoltage(power / current);
            setResistance(voltage / current);
        }
        else if (voltage !== 0.0 && power !== 0.0) {
            setCurrent(power / voltage);
            setResistance(voltage / current);
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
                                        <InputGroup>
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
                                        <InputGroup>
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
                                        <InputGroup>
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
                                        <InputGroup>
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
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="information" title="Information">
                                        <MathJax.Provider>
                                            <h1>Ohms</h1>
                                            <div className="p-3 border">
                                                <MathJax.Node  formula={'R = V / I'} />
                                                <br/>
                                                <MathJax.Node  formula={'R = V^2 / P'} />
                                                <br/>
                                                <MathJax.Node  formula={'R = P / I^2'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1>Amps</h1>
                                            <div className="p-3 border">
                                                <MathJax.Node  formula={'I = V / R'} />
                                                <br/>
                                                <MathJax.Node  formula={'I = P / V'} />
                                                <br/>
                                                <MathJax.Node  formula={'I = sqrt(P / R)'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1>Volts</h1>
                                            <div className="p-3 border">
                                                <MathJax.Node  formula={'V = I * R'} />
                                                <br/>
                                                <MathJax.Node  formula={'V = P / I'} />
                                                <br/>
                                                <MathJax.Node  formula={'V = sqrt(P * R)'} />
                                            </div>
                                        </MathJax.Provider>
                                        <MathJax.Provider>
                                            <h1>Watts</h1>
                                            <div className="p-3 border">
                                                <MathJax.Node  formula={'P = V * I'} />
                                                <br/>
                                                <MathJax.Node  formula={'P = V^2 / R'} />
                                                <br/>
                                                <MathJax.Node  formula={'P = I^2 * R'} />
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

export default ConvertElectrical;