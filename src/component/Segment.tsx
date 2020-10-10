import React from 'react';
import {
    Container
}
from 'react-bootstrap';

const Segment: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
    return (
        <Container className="segment mt-sm-5" as="section">
            {props.children}
        </Container>
    );
};

export default Segment;