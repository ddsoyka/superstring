import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Container,
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
import MissingDictionary from './MissingDictionary';

const MAXIMUM_LENGTH = 10000;

const RandomWords: React.FC = () => {
    const [length, setLength] = React.useState(10);
    const [separator, setSeparator] = React.useState("");
    const [retry, setRetry] = React.useState(true);
    const [output, setOutput] = React.useState('');

    const {language, isLoading, dictionary, error} = ReactRedux.useSelector(
        (state: State.RootState) => ({
            language: state.i18n.language,
            isLoading: state.random.isLoading,
            dictionary: state.random.dictionary,
            error: state.error
        })
    );
    const dispatch = ReactRedux.useDispatch<typeof State.Store.dispatch>()

    const onSubmit = async (event: any) => {
        event.preventDefault();

        if (dictionary && language) {
            const arg = {
                count: length,
                separator: separator,
                collection: dictionary
            };
            const action = await dispatch(Thunk.createRandomString(arg));
            const result = Toolkit.unwrapResult(action);

            setOutput(result);
        }
    };

    if (error || !language) setRetry(false);
    if (!retry) return <MissingDictionary />;
    if (!isLoading && language && !dictionary) dispatch(Thunk.loadDictionary(language));

    return (
        <>
            <header>
                <Container as="section">
                    <Row className="justify-content-center">
                        <Images.Word className="header-image" title="Random Words" />
                    </Row>
                    <Row className="justify-content-center">
                        <h1 className="header-title">Random Words</h1>
                    </Row>
                </Container>
            </header>
            <Container className="segment" as="section">
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
                                    id="none"
                                    type="radio"
                                    label="None"
                                    checked={separator === ""}
                                    onChange={() => setSeparator("")}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    id="space"
                                    type="radio"
                                    label="Space"
                                    checked={separator === " "}
                                    onChange={() => setSeparator(" ")}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    id="newline"
                                    type="radio"
                                    label="New Line"
                                    checked={separator === "\n"}
                                    onChange={() => setSeparator("\n")}
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
            </Container>
        </>
    );
}

export default RandomWords;