import React from 'react';
import {
    Container
}
from 'react-bootstrap';
import './Wrapper.css';

interface WrapperProps {
    reverse?: boolean
}

const Wrapper: React.FC<WrapperProps> = (props) => {
    return (
        <Container fluid className={props.reverse ? "wrapper-reverse" : "wrapper"}>
            {props.children}
        </Container>
    );
};

export default Wrapper;