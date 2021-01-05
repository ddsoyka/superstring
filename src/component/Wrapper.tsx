import React from 'react';
import {
    Container,
    ContainerProps
}
from 'react-bootstrap';
import './Wrapper.css';

const Wrapper: React.FC<ContainerProps> = (props) => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    );
};

export default Wrapper;
