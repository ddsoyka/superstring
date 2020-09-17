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
    Col
}
from 'react-bootstrap';
import {
    selectWords
}
from './api/random';
import {
    loadDictionary
}
from './Thunks';
import State from './State';
import Language from './Language'
import Images from './Images';
import Header from './Header';
import MissingDictionary from './MissingDictionary';

const mapStateToProps = (state: State) => {
    return {
        language: state.language,
        dictionary: state.dictionary
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

    if (props.language) {
        if (!props.dictionary) {
            props.load(props.language);
        }
    }
    else {
        return <MissingDictionary />;
    }

    const onSubmit = (event: any) => {
        if (props.dictionary) {
            const output = document.getElementById("output") as HTMLInputElement;
            output.value = selectWords(length, props.dictionary, separator);
        }

        event.preventDefault();
    };

    return (
        <>
            <Header id="random-words" title="Random Words" image={<Images.Word height="15rem" title="Random Words" />}/>
            <Container className="segment" as="section">
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
                    </fieldset>
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
                </Form>
            </Container>
        </>
    );
}

export default connector(RandomWords);