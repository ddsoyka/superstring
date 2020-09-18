import React from 'react';
import {
    Container,
    Row,
    Col
}
from 'react-bootstrap';
import Images from './Images';
import './About.css';

function About() {
    return (
        <>
            <header>
                <Container as="section">
                    <Row className="justify-content-center">
                        <Images.Group className="header-image" title="About" />
                    </Row>
                    <Row className="justify-content-center">
                        <h1 className="header-title">About</h1>
                    </Row>
                </Container>
            </header>
            <Container id="contact" className="segment" as="section">
                <h3>Contact</h3>
                <br />
                <div id="social">
                    <Row>
                        <Col>
                            <a href="mailto:ddsoyka@pm.me">
                                <Images.Mail height="2.5rem" title="Email" />
                            </a>
                        </Col>
                        <Col>
                            <a href="https://www.facebook.com/ddsoyka">
                                <Images.Facebook height="2.5rem" title="Facebook" />
                            </a>
                        </Col>
                        <Col>
                            <a href="https://www.facebook.com/ddsoyka">
                                <Images.Twitter height="2.5rem" title="Twitter" />
                            </a>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default About;