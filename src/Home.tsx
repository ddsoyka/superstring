import React from 'react';
import {
    Container
}
from 'react-bootstrap';
import Header from './Header';
import Images from './Images';

function Home() {
    return (
        <>
            <Header id="home" title="Superstring" image={<Images.Logo height="15rem" title="Superstring"/>}>
                <p>
                    A collection of tools for generating and manipulating strings
                    <br />
                    <i><small>{process.env.NPM_PACKAGE_VERSION}</small></i>
                </p>
            </Header>
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