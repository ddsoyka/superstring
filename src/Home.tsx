import React from 'react';
import {
    Container,
    Row
}
from 'react-bootstrap';
import Images from './image';

function Home() {
    return (
        <>
            <header>
                <Container as="section">
                    <Row className="justify-content-center">
                        <Images.Logo className="header-image" title="Superstring"/>
                    </Row>
                    <Row className="justify-content-center">
                        <h1 className="header-title">Superstring</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <p className="header-description">
                            A collection of tools for generating and manipulating strings
                            <br />
                            <i><small>v0.1.0</small></i>
                        </p>
                    </Row>
                </Container>
            </header>
            <Container id="tool-list" className="segment" as="section">
                <h3 className="title">List of Tools</h3>
                <p className="description">Here are the tools currently offered</p>
                <ul>
                    <li>Random String</li>
                    <li>Random Words</li>
                </ul>
            </Container>
        </>
    );
}

export default Home;