import React from 'react';
import {
    Link
}
from 'react-router-dom';
import {
    Button,
    Card,
    CardDeck
}
from 'react-bootstrap';
import Images from '../../image';
import Header from '../../component/Header';
import Segment from '../../component/Segment';

const Random: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Random} title="Random" />
                <Header.Title>Random</Header.Title>
                <Header.Body>
                    <p>
                        Tools for creating strings of random data.
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>String</Card.Title>
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
            </Segment>
        </>
    );
};

export default Random;