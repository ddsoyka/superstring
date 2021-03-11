import React from 'react';
import {
    Button,
    Row,
    Col
}
from 'react-bootstrap';
import Unknown from '../../image/unknown.svg';
import Wrapper from '../../component/Wrapper';

interface MissingDictionaryProps {
    repeat: () => void;
}

const MissingDictionary: React.FC<MissingDictionaryProps> = props => {
    return (
        <Wrapper>
            <Row className="p-5">
                <Col sm />
                <Col sm={6}>
                    <Unknown className="w-100" title="Random String" />
                </Col>
                <Col sm />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="text-center">
                    <h1>Missing Dictionary</h1>
                </Col>
                <Col />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="text-center">
                    <p>
                        A list of words is required to use this component.
                    </p>
                </Col>
                <Col />
            </Row>
            <Row className="p-3">
                <Col />
                <Col className="flex-grow-0">
                    <Button onClick={props.repeat}>Retry</Button>
                </Col>
                <Col />
            </Row>
        </Wrapper>
    );
};

export default MissingDictionary;
