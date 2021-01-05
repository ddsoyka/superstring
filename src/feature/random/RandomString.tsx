import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Form,
    Button,
    Row,
    Col,
    InputGroup
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Wrapper from '../../component/Wrapper';
import SpinnerButton from '../../component/SpinnerButton';
import {
    createRandomString,
    saveRandomData
}
from './randomSlice';
import { setError } from '../error/errorSlice';

const MAXIMUM_LENGTH = 10000000;
const DEFAULT_LENGTH = 10000;

const RandomString: React.FC = () => {
    const [length, setLength] = React.useState(DEFAULT_LENGTH);
    const [lowercase, setLowercase] = React.useState(true);
    const [uppercase, setUppercase] = React.useState(true);
    const [digits, setDigits] = React.useState(true);
    const [symbols, setSymbols] = React.useState(true);
    const [whitespace, setWhitespace] = React.useState(false);
    const [output, setOutput] = React.useState('');

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const generate = async () => {
        setOutput('');

        let characters = "";

        if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (digits) characters += "0123456789";
        if (symbols) characters += "~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
        if (whitespace) characters += " \n\t\r";

        if (characters.length !== 0) {
            const arg = {
                count: length,
                characters: characters
            };

            try {
                const action = await dispatch(createRandomString(arg));
                const result = Toolkit.unwrapResult(action);

                setOutput(result);
            }
            catch (error) {
                console.error(error);
            }
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
        setLength(DEFAULT_LENGTH);
        setLowercase(true);
        setUppercase(true);
        setDigits(true);
        setSymbols(true);
        setWhitespace(false);
        setOutput('');
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            console.log(`Wrote ${output.length} characters to the clipboard`);
        }
        catch (error) {
            console.error(error);
            dispatch(setError(error));
        }
    };

    return (
        <Wrapper>
            <Row className="py-5 mx-0 w-100">
                <Col>
                    <Form.Control
                        id="output"
                        as="textarea"
                        value={output || ''}
                        rows={15}
                        readOnly
                    />
                </Col>
            </Row>
            <Row className="pb-5 mx-0">
                <Col>
                    <InputGroup>
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
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={6} md={2} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="lowercase"
                        type="switch"
                        label="Lowercase"
                        checked={lowercase}
                        onChange={() => setLowercase(!lowercase)}
                    />
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="uppercase"
                        type="switch"
                        label="Uppercase"
                        checked={uppercase}
                        onChange={() => setUppercase(!uppercase)}
                    />
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="digits"
                        type="switch"
                        label="Digits"
                        checked={digits}
                        onChange={() => setDigits(!digits)}
                    />
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="symbols"
                        type="switch"
                        label="Symbols"
                        checked={symbols}
                        onChange={() => setSymbols(!symbols)}
                    />
                </Col>
                <Col xs={12} md={2} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="whitespace"
                        type="switch"
                        label="Whitespace"
                        checked={whitespace}
                        onChange={() => setWhitespace(!whitespace)}
                    />
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={3} className="pb-3 pb-md-0">
                    <SpinnerButton
                        className="w-100"
                        active={loading === 'create'}
                        disabled={loading !== 'none'}
                        onClick={generate}>
                        Generate
                    </SpinnerButton>
                </Col>
                <Col xs={4} md={3}>
                    <Button
                        className="w-100"
                        variant="secondary"
                        disabled={loading !== 'none' || output === ''}
                        onClick={copy}>
                        Copy
                    </Button>
                </Col>
                <Col xs={4} md={3}>
                    <SpinnerButton
                        className="w-100"
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={loading !== 'none' || output === ''}
                        onClick={save}>
                        Save
                    </SpinnerButton>
                </Col>
                <Col xs={4} md={3}>
                    <Button
                        className="w-100"
                        variant="secondary"
                        disabled={loading !== 'none'}
                        onClick={reset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default RandomString;
