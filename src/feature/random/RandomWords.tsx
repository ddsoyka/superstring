import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    InputGroup
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Language from '../../api/Language';
import Images from '../../image';
import Header from '../../component/Header';
import Segment from '../../component/Segment';
import SpinnerButton from '../../component/SpinnerButton';
import { loadDictionary, createRandomWords, saveRandomData } from './randomSlice';

const MAXIMUM_LENGTH = 10000000;

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
    const [length, setLength] = React.useState(10);
    const [separator, setSeparator] = React.useState("");
    const [retry, setRetry] = React.useState(true);
    const [output, setOutput] = React.useState('');

    const {loading, dictionary} = ReactRedux.useSelector((state: State.RootState) => state.random);
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);
    const error = ReactRedux.useSelector((state: State.RootState) => state.error);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const onSubmit = async (event: any) => {
        event.preventDefault();

        setOutput('')

        if (dictionary && language) {
            const arg = {
                count: length,
                separator: separator,
                collection: dictionary
            };

            const action = await dispatch(createRandomWords(arg));
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
        setSeparator('');
        setOutput('');
    };

    if (error || !language || language === Language.UNKNOWN) setRetry(false);
    if (!retry) return <MissingDictionary />;
    if (loading === 'none' && language && language !== Language.UNKNOWN && !dictionary) dispatch(loadDictionary(language));

    return (
        <>
            <Header>
                <Header.Image src={Images.Word} title="Random Words" />
                <Header.Title>Random Words</Header.Title>
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
                        <Row className="pb-4 justify-content-center flex-wrap">
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
};

export default RandomWords;