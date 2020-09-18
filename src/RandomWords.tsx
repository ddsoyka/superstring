import React, {
    useState
}
from 'react';
import {
    connect,
    ConnectedProps
}
from 'react-redux';
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Spinner
}
from 'react-bootstrap';
import * as random from './api/random';
import {
    loadDictionary
}
from './Thunks';
import State from './State';
import Language from './Language'
import Images from './Images';
import MissingDictionary from './MissingDictionary';

const mapStateToProps = (state: State) => {
    return {
        language: state.i18n?.language,
        dictionary: state.dictionary,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: (language: Language) => dispatch(loadDictionary(language))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Properties = ConnectedProps<typeof connector>

const RandomWords: React.FC<Properties> = (props: Properties) => {
    const [length, setLength] = useState(10);
    const [separator, setSeparator] = useState("");
    const [retry, setRetry] = useState(true);
    const onSubmit = (event: any) => {
        if (props.dictionary) {
            const output = document.getElementById("output") as HTMLInputElement;
            output.value = random.selectRandom(length, props.dictionary).join(separator);
        }

        event.preventDefault();
    };

    if (!retry) {
        return <MissingDictionary />;
    }
    if (props.error || !props.language) {
        setRetry(false);
        return <MissingDictionary />;
    }
    if (retry && props.language && !props.dictionary) props.load(props.language);

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
                {
                    !props.dictionary &&
                    <>
                        <Spinner animation="border"/>
                        <h3>Loading dictionary...</h3>
                    </>
                }
                {
                    props.dictionary &&
                    <Form id="random-words-generator" onSubmit={(e) => onSubmit(e)}>
                        <fieldset>
                            <legend>Options</legend>
                            <Row>
                                <Col>
                                    <Form.Label>Length</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="1000"
                                        value={length}
                                        onChange={(e) => setLength(parseInt(e.target.value))}
                                    />
                                </Col>
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
                                <Button variant="primary" type="submit">Generate</Button>
                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Output</Form.Label>
                                    <Form.Control id="output" as="textarea" rows={5} readOnly />
                                </Col>
                            </Row>
                        </fieldset>
                    </Form>
                }
            </Container>
        </>
    );
}

export default connector(RandomWords);