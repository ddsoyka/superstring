import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Container,
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
import Language from '../../api/Language';
import Images from '../../image';
import SpinnerButton from '../../component/SpinnerButton';
import Wrapper from '../../component/Wrapper';
import {
    loadDictionary,
    createRandomWords,
    saveRandomData
}
from './randomSlice';

const MAXIMUM_LENGTH = 1000000;
const DEFAULT_SEPARATOR = ' ';
const DEFAULT_LENGTH = 1000;

const MissingDictionary: React.FC = () => {
    return (
        <Container>
            <Row className="justify-content-center my-4">
                <Images.Unknown height="20rem" title="Random String" />
            </Row>
            <Row className="justify-content-center">
                <h1>Missing Dictionary</h1>
            </Row>
            <Row className="justify-content-center">
                <p>
                    A list of words is required to use this component.
                </p>
            </Row>
        </Container>
    );
};

const RandomWords: React.FC = () => {
    const [length, setLength] = React.useState(DEFAULT_LENGTH);
    const [separator, setSeparator] = React.useState(DEFAULT_SEPARATOR);
    const [retry, setRetry] = React.useState(true);
    const [output, setOutput] = React.useState('');
    const [key, setKey] = React.useState('output');

    const {loading, dictionary} = ReactRedux.useSelector((state: State.RootState) => state.random);
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);
    const error = ReactRedux.useSelector((state: State.RootState) => state.error);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const onSubmit = async () => {
        setOutput('')

        if (dictionary && language) {
            const arg = {
                count: length,
                separator: separator,
                collection: dictionary
            };

            try {
                const action = await dispatch(createRandomWords(arg));
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
        setSeparator(DEFAULT_SEPARATOR);
        setOutput('');
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            console.log(`Wrote ${output.length} characters to the clipboard`);
        }
        catch (error) {
            console.error(error);
            dispatch(State.setError(error));
        }
    };

    if (error || !language || language === Language.UNKNOWN) setRetry(false);
    if (!retry) return <MissingDictionary />;
    if (loading === 'none' && language && language !== Language.UNKNOWN && !dictionary) dispatch(loadDictionary(language));

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
                                        <Nav.Link eventKey="output">Output</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-grow-1">
                                        <Nav.Link eventKey="options">Options</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Col className="flex-grow-0 flex-md-grow-1" />
                            </Row>
                            <Row>
                                <Tab.Content as={Col}>
                                    <Tab.Pane eventKey="output" title="Output">
                                        <Form.Control
                                            id="output"
                                            as="textarea"
                                            value={output || ''}
                                            rows={15}
                                            readOnly
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="options" title="Options">
                                        <Wrapper reverse>
                                            <Row className="py-3 mx-sm-3">
                                                <InputGroup as={Col} className="px-0">
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
                                            </Row>
                                            <Row className="py-3 mx-sm-3 justify-content-center align-items-center">
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="none"
                                                        type="radio"
                                                        label="None"
                                                        checked={separator === ""}
                                                        onChange={() => setSeparator("")}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="space"
                                                        type="radio"
                                                        label="Space"
                                                        checked={separator === " "}
                                                        onChange={() => setSeparator(" ")}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0 text-nowrap">
                                                    <Form.Check
                                                        id="newline"
                                                        type="radio"
                                                        label="New Line"
                                                        checked={separator === "\n"}
                                                        onChange={() => setSeparator("\n")}
                                                    />
                                                </Col>
                                            </Row>
                                        </Wrapper>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Wrapper>
                    </Tab.Container>
                </Col>
            </Row>
            <Row className="pb-3 justify-content-center">
                <Col className="flex-grow-0">
                    <SpinnerButton active={loading === 'create'} onClick={onSubmit}>Generate</SpinnerButton>
                </Col>
                <Col className="flex-grow-0">
                    <Button variant="secondary" disabled={output === ''} onClick={copy}>Copy</Button>
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
        </Wrapper>
    );
};

export default RandomWords;