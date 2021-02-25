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

const Analyze: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Analyze} title="Analyze" />
                <Header.Title>Analyze</Header.Title>
                <Header.Body>
                    <p>
                        Tools for analyzing data in varying formats.
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>Binary Visualizer</Card.Title>
                            <Card.Text>
                                Create a graphical representation of any binary file.
                            </Card.Text>
                            <Button as={Link} variant="primary" to="/analyze/binary-visualize">Go</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Analyze;
