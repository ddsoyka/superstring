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
                <header id="random">
                    <Container as="section">
                        <Images.Random height="15rem" title="Random" />
                        <h1 className="title">Random</h1>
                        <p className="description">
                            Tools for creating random data
                        </p>
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