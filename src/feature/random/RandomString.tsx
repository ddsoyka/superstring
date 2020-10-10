import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
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
import * as State from '../../app/store';
import Wrapper from '../../component/Wrapper';
import SpinnerButton from '../../component/SpinnerButton';
import { createRandomString, saveRandomData } from './randomSlice';

const MAXIMUM_LENGTH = 10000000;

const RandomString: React.FC = () => {
    const [length, setLength] = React.useState(10);
    const [lowercase, setLowercase] = React.useState(true);
    const [uppercase, setUppercase] = React.useState(true);
    const [digits, setDigits] = React.useState(true);
    const [symbols, setSymbols] = React.useState(true);
    const [output, setOutput] = React.useState('');
    const [key, setKey] = React.useState('output');

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const generate = async (event: any) => {
        event.preventDefault();

        setOutput('')

        let characters = "";

        if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (digits) characters += "0123456789";
        if (symbols) characters += "~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";

        if (characters !== "") {
            const arg = {
                count: length,
                characters: characters
            };
            const action = await dispatch(createRandomString(arg));
            const result = Toolkit.unwrapResult(action);

            setOutput(result);
        }
    };

    const save = () => {
        const argument = {
            type: 'txt',
            data: output
        };

        dispatch(saveRandomData(argument));
    };

    const reset = () => {
        setLength(10);
        setLowercase(true);
        setUppercase(true);
        setDigits(true);
        setSymbols(true);
        setOutput('');
    };

    return (
        <>
            <Wrapper>
                <Row className="mt-3" />
                <Row>
                    <Col>
                        <Tab.Container activeKey={key} id="tabs" onSelect={key => setKey(key as string)}>
                            <Wrapper>
                                <Row className="mb-3">
                                    <Nav as={Col} variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link eventKey="output">Output</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="options">Options</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Row>
                                <Row>
                                    <Tab.Content as={Col}>
                                        <Tab.Pane eventKey="output" title="Output">
                                            <Form.Control
                                                id="output"
                                                as="textarea"
                                                className="vh-50"
                                                value={output || ''}
                                                readOnly
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="options" title="Options">
                                            <InputGroup className="pb-4">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Length</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    id="length"
                                                    type="number"
                                                    min={1}
                                                    max={MAXIMUM_LENGTH}
                                                    value={length}
                                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="secondary" onClick={() => setLength(MAXIMUM_LENGTH)}>Max</Button>
                                                    <Button variant="secondary" onClick={() => setLength(1)}>Min</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Row className="pb-4 justify-content-center">
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="lowercase"
                                                        type="switch"
                                                        label="Lowercase"
                                                        checked={lowercase}
                                                        onChange={() => setLowercase(!lowercase)}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="uppercase"
                                                        type="switch"
                                                        label="Uppercase"
                                                        checked={uppercase}
                                                        onChange={() => setUppercase(!uppercase)}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="digits"
                                                        type="switch"
                                                        label="Digits"
                                                        checked={digits}
                                                        onChange={() => setDigits(!digits)}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="symbols"
                                                        type="switch"
                                                        label="Symbols"
                                                        checked={symbols}
                                                        onChange={() => setSymbols(!symbols)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Wrapper>
                        </Tab.Container>
                    </Col>
                </Row>
                <Row className="mb-3 fixed-bottom">
                    <Col className="flex-grow-1" />
                    <Col className="flex-grow-0">
                        <SpinnerButton active={loading === 'create'} onClick={generate}>Generate</SpinnerButton>
                    </Col>
                    <Col className="flex-grow-0">
                        <SpinnerButton
                            variant="secondary"
                            active={loading === 'save'}
                            disabled={output === ''}
                            onClick={save}>
                                Save
                        </SpinnerButton>
                    </Col>
                    <Col className="flex-grow-0">
                        <Button variant="secondary" onClick={reset}>Reset</Button>
                    </Col>
                    <Col className="flex-grow-1" />
                </Row>
            </Wrapper>
        </>
    );
}

export default RandomString;