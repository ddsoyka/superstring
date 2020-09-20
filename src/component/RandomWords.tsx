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
import Header from './Header';
import Segment from './Segment';

const MAXIMUM_LENGTH = 10000;

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

    const {isLoading, dictionary} = ReactRedux.useSelector((state: State.RootState) => state.random);
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);
    const error = ReactRedux.useSelector((state: State.RootState) => state.error);
    
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
            <Header>
                <Header.Image src={Images.Word} title="Random Words" />
                <Header.Title>Random Words</Header.Title>
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
            </Segment>
        </>
    );
};

export default RandomWords;