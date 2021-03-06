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
import Icon from '../../image/random.svg';
import Header from '../../component/Header';
import Segment from '../../component/Segment';

const Random: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Icon} title="Random" />
                <Header.Title>Random</Header.Title>
            </Header>
            <Segment>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>String</Card.Title>
                            <Card.Text>
                                Create a random string of characters.
                            </Card.Text>
                            <Button as={Link} variant="primary" to="/random/string">Go</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Words</Card.Title>
                            <Card.Text>
                                Create a random string of words.
                            </Card.Text>
                            <Button as={Link} variant="primary" to="/random/words">Go</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Image</Card.Title>
                            <Card.Text>
                                Generate a random image.
                            </Card.Text>
                            <Button as={Link} variant="primary" to="/random/image">Go</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Random;
