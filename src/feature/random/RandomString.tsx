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

        if (characters !== "") {
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
            <Row className="py-5 mx-sm-3">
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
            <Row className="pb-5 mx-sm-3 justify-content-center align-items-center">
                <InputGroup as={Col} md={5} className="px-0">
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
                <Col className="flex-grow-0">
                    <Form.Check
                        id="whitespace"
                        type="switch"
                        label="Whitespace"
                        checked={whitespace}
                        onChange={() => setWhitespace(!whitespace)}
                    />
                </Col>
            </Row>
            <Row className="pb-5 justify-content-center">
                <Col className="flex-grow-0">
                    <SpinnerButton active={loading === 'create'} disabled={loading !== 'none'} onClick={generate}>Generate</SpinnerButton>
                </Col>
                <Col className="flex-grow-0">
                    <Button variant="secondary" disabled={loading !== 'none' || output === ''} onClick={copy}>Copy</Button>
                </Col>
                <Col className="flex-grow-0">
                    <SpinnerButton
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={loading !== 'none' || output === ''}
                        onClick={save}>
                        Save
                    </SpinnerButton>
                </Col>
                <Col className="flex-grow-0">
                    <Button variant="secondary" disabled={loading !== 'none'} onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default RandomString;
