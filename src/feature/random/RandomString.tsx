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
import Images from '../../image';
import Header from '../../component/Header';
import Segment from '../../component/Segment';
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

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const onSubmit = async (event: any) => {
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
            <Header>
                <Header.Image src={Images.Password} title="Random String" />
                <Header.Title>Random String</Header.Title>
            </Header>
            <Segment>
                <Form className="border p-5" onSubmit={(e) => onSubmit(e)}>
                    <fieldset className="pb-1">
                        <legend>Output</legend>
                        <Form.Control
                            id="output"
                            as="textarea"
                            rows={5}
                            value={output || ''}
                            readOnly
                        />
                    </fieldset>
                    <br />
                    <fieldset disabled={loading !== 'none'}>
                        <legend className="pb-1">Options</legend>
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
                        <Row className="justify-content-center">
                            <Col className="flex-grow-0">
                                <SpinnerButton active={loading === 'create'} type="submit">Generate</SpinnerButton>
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
                        </Row>
                    </fieldset>
                </Form>
            </Segment>
        </>
    );
}

export default RandomString;