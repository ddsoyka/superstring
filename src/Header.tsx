import React from 'react';
import {
    Container
}
from 'react-bootstrap';

interface Properties {
    id?: string
    image?: React.ReactNode
    title?: string
    children?: any
}

const Header: React.FC<Properties> = (props: Properties) => {
    const {id, image, title, children} = props;

    return (
        <header id={id}>
            <Container as="section">
                {image}
                <h1 className="title">{title}</h1>
                <div className="description">
                    {children}
                </div>
            </Container>
        </header>
    );
};

export default Header;