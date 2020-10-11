import React from 'react';
import {
    Container
}
from 'react-bootstrap';
import './Wrapper.css';

const Wrapper: React.FC = (props) => {
    return (
        <Container fluid className="wrapper">
            {props.children}
        </Container>
    );
};

export default Wrapper;