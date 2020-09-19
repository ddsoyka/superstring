import React from 'react';
import {
    Container,
    Row
}
from 'react-bootstrap';
import Images from '../image';

const MissingDictionary: React.FC = () => {
    return (
        <Container>
            <Row className="justify-content-center my-4">
                <Images.Unknown height="20rem" title="Random String" />
            </Row>
            <Row className="justify-content-center">
                <h1>Missing Dictionary</h1>
            </Row>
            <Row className="justify-content-center">
                <p>
                    A list of words is required to use this component.
                </p>
            </Row>
        </Container>
    );
};

export default MissingDictionary;