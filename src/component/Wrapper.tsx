import React from 'react';
import {
    Container
}
from 'react-bootstrap';

const Wrapper: React.FC = (props) => {
    return (
        <Container fluid className="wrapper">
            {props.children}
        </Container>
    );
};

export default Wrapper;