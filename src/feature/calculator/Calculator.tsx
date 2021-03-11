import React from 'react';
import {
    Link
}
from 'react-router-dom';
import {
    CardDeck,
    Card,
    Button
}
from 'react-bootstrap';
import Icon from '../../image/calculator.svg';
import Header from '../../component/Header';
import Segment from '../../component/Segment';

const Calculator: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Icon} title="Calculator" />
                <Header.Title>Calculator</Header.Title>
                <Header.Body>
                    <p>
                        Calculators for different data types.
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>Electrical</Card.Title>
                            <Card.Text>Calculate resistance, current, voltage and power.</Card.Text>
                            <Button as={Link} variant="primary" to="/calculator/electrical">Go</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Calculator;
