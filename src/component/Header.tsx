import React from 'react';
import {
    Container,
    Row
}
from 'react-bootstrap';
import { SvgrComponent } from '*.svg';
import './Header.css';

type HeaderImageProps = {
    src: SvgrComponent,
    title?: string
}

const HeaderBase: React.FC = (props) => {
    return (
        <header className="text-center border-bottom pt-5">
            <Container as="section">
                {props.children}
            </Container>
        </header>
    );
};

const HeaderImage: React.FC<HeaderImageProps> = (props) => {
    return (
        <Row className="py-3 justify-content-center">
            <props.src className="header-image" title={props.title}/>
        </Row>
    );
};

const HeaderTitle: React.FC = (props) => {
    return (
        <Row className="header-title py-3 justify-content-center">
            <h1>{props.children}</h1>
        </Row>
    );
};

const HeaderBody: React.FC = (props) => {
    return (
        <Row className="header-body py-3 justify-content-center">
            {props.children}
        </Row>
    );
};

type Header = typeof HeaderBase & {
    Image: typeof HeaderImage,
    Title: typeof HeaderTitle,
    Body: typeof HeaderBody
};

const instance: Header = Object.assign(
    HeaderBase,
    {
        Image: HeaderImage,
        Title: HeaderTitle,
        Body: HeaderBody
    }
);

export default instance;