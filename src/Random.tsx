import React, {
    Component
}
from 'react';
import {
    Link
}
from 'react-router-dom';
import {
    Container,
    Row,
    Button,
    Card,
    CardDeck
}
from 'react-bootstrap';
import Images from './Images';

class Random extends Component {
    render() {
        return (
            <>
                <header>
                    <Container as="section">
                        <Row className="justify-content-center">
                            <Images.Random className="header-image" title="Random" />
                        </Row>
                        <Row className="justify-content-center">
                            <h1 className="header-title">Random</h1>
                        </Row>
                        <Row className="justify-content-center">
                            <p className="header-description">
                                Tools for creating random data
                            </p>
                        </Row>
                    </Container>
                </header>
                <Container id="random-tools" className="segment" as="section">
                    <CardDeck>
                        <Card>
                            <Card.Body>
                                <Card.Title>Strings</Card.Title>
                                <Card.Text>
                                    Generate a random string from a combination of
                                    lowercase and uppercase letters, digits and symbols.
                                </Card.Text>
                                <Link to="/random/string">
                                    <Button variant="primary">Go</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Words</Card.Title>
                                <Card.Text>
                                    Create a random string of words.
                                </Card.Text>
                                <Link to="/random/words">
                                    <Button variant="primary">Go</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </>
        );
    }
}

export default Random;