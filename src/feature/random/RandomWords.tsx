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
import Images from '../../image';
import SpinnerButton from '../../component/SpinnerButton';
import Wrapper from '../../component/Wrapper';
import {
    loadDictionary,
    createRandomWords,
    saveRandomData,
    setRetry
}
    from './randomSlice';
import { setError } from '../error/errorSlice';

const MAXIMUM_LENGTH = 1000000;
const DEFAULT_SEPARATOR = ' ';
const DEFAULT_LENGTH = 1000;

interface MissingDictionaryProps {
    repeat: () => void;
}

const MissingDictionary: React.FC<MissingDictionaryProps> = props => {
    return (
        <Wrapper>
            <Row className="p-5">
                <Col sm />
                <Col sm={6}>
                    <Images.Unknown className="w-100" title="Random String" />
                </Col>
                <Col sm />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="text-center">
                    <h1>Missing Dictionary</h1>
                </Col>
                <Col />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="text-center">
                    <p>
                        A list of words is required to use this component.
                    </p>
                </Col>
                <Col />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="flex-grow-0">
                    <Button onClick={props.repeat}>Retry</Button>
                </Col>
                <Col />
            </Row>
        </Wrapper>
    );
};

const RandomWords: React.FC = () => {
    const [length, setLength] = React.useState(DEFAULT_LENGTH);
    const [separator, setSeparator] = React.useState(DEFAULT_SEPARATOR);
    const [output, setOutput] = React.useState('');
    const [key, setKey] = React.useState('output');

    const { loading, dictionary, retry } = ReactRedux.useSelector((state: State.RootState) => state.random);
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const onSubmit = async () => {
        setOutput('');

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
            dispatch(setError(error));
        }
    };

    const repeat = () => {
        dispatch(setRetry(true));
        dispatch(setError(null));
    };

    if (language && !dictionary && retry) {
        dispatch(setRetry(false));
        dispatch(loadDictionary(language));
    }
    else if ((!language || !dictionary) && loading === 'none')
        return <MissingDictionary repeat={repeat} />;

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
                    <SpinnerButton active={loading === 'create'} disabled={loading !== 'none'} onClick={onSubmit}>Generate</SpinnerButton>
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

export default RandomWords;
