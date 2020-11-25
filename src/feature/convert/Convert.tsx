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

const Convert: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Convert} title="Convert" />
                <Header.Title>Convert</Header.Title>
                <Header.Body>
                    <p>
                        Tools for converting data.
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>Electrical</Card.Title>
                            <Card.Text>
                                Calculate resistance, current, voltage and power.
                            </Card.Text>
                            <Button as={Link} variant="primary" to="/convert/electrical">Go</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Convert;