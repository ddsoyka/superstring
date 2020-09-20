import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Form,
    Button,
    Row,
    Col,
    Spinner
}
from 'react-bootstrap';
import * as Thunk from '../state/thunk';
import * as State from '../state';
import Images from '../image';
import Header from './Header';
import Segment from './Segment';

const MAXIMUM_LENGTH = 4294967296;

const RandomString: React.FC = () => {
    const [length, setLength] = React.useState(10);
    const [lowercase, setLowercase] = React.useState(true);
    const [uppercase, setUppercase] = React.useState(true);
    const [digits, setDigits] = React.useState(true);
    const [symbols, setSymbols] = React.useState(true);
    const [output, setOutput] = React.useState('');

    const isLoading = ReactRedux.useSelector((state: State.RootState) => state.random.isLoading);

    const dispatch = ReactRedux.useDispatch<typeof State.Store.dispatch>()

    const onSubmit = async (event: any) => {
        event.preventDefault();
        
        let characters = "";

        if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (digits) characters += "0123456789";
        if (symbols) characters += "~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";

        if (characters !== "") {
            const arg = {
                count: length,
                separator: '',
                collection: characters.split('')
            };
            const action = await dispatch(Thunk.createRandomString(arg));
            const result = Toolkit.unwrapResult(action);
            
            setOutput(result);
        }
    };

    return (
        <>
            <Header>
                <Header.Image src={Images.Password} title="Random String" />
                <Header.Title>Random String</Header.Title>
            </Header>
            <Segment>
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Row>
                        <Form.Label>Output</Form.Label>
                        <Form.Control
                            id="output"
                            as="textarea"
                            rows={5}
                            maxLength={MAXIMUM_LENGTH}
                            value={output || ''}
                            readOnly
                        />
                    </Row>
                    <fieldset disabled={isLoading}>
                        <legend>Options</legend>
                        <Row>
                            <Form.Label>Length</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={MAXIMUM_LENGTH}
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                            />
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    id="lowercase"
                                    type="checkbox"
                                    label="Lowercase Letters"
                                    checked={lowercase}
                                    onChange={() => setLowercase(!lowercase)}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    id="uppercase"
                                    type="checkbox"
                                    label="Uppercase Letters"
                                    checked={uppercase}
                                    onChange={() => setUppercase(!uppercase)}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    id="digits"
                                    type="checkbox"
                                    label="Digits"
                                    checked={digits}
                                    onChange={() => setDigits(!digits)}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    id="symbols"
                                    type="checkbox"
                                    label="Symbols"
                                    checked={symbols}
                                    onChange={() => setSymbols(!symbols)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    {!isLoading && 'Generate'}
                                    {
                                        isLoading &&
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">Loading...</span>
                                        </>
                                    }
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={() => setOutput('')}>Clear</Button>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </Segment>
        </>
    );
}

export default RandomString;