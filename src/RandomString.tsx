import React, {
    useState
}
from 'react';
import {
    Container,
    Form,
    Button,
    Row,
    Col
}
from 'react-bootstrap';
import * as random from './api/random';
import Images from './Images';

const RandomString: React.FC = () => {
    const [length, setLength] = useState(10);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [digits, setDigits] = useState(true);
    const [symbols, setSymbols] = useState(true);

    const onSubmit = (event: any) => {
        let output = document.getElementById("output") as HTMLInputElement;
        let characters = "";

        if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (digits) characters += "0123456789";
        if (symbols) characters += "~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
        if (characters !== "") output.value = random.selectRandom(length, characters.split('')).join('');

        event.preventDefault();
    };

    return (
        <>
            <header>
                <Container as="section">
                    <Row className="justify-content-center">
                        <Images.Password className="header-image" title="Random String" />
                    </Row>
                    <Row className="justify-content-center">
                        <h1 className="header-title">Random String</h1>
                    </Row>
                </Container>
            </header>
            <Container id="generate-random-string" className="segment" as="section">
                <Form id="random-string-generator" onSubmit={(e) => onSubmit(e)}>
                    <fieldset>
                        <legend>Options</legend>
                        <Row>
                            <Col>
                                <Form.Label>Length</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="1000000"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                />
                            </Col>
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

export default RandomString