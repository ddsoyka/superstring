import React from 'react';
import {
    Row,
    Col
}
from 'react-bootstrap';
import Images from '../image';
import Header from '../component/Header';
import Segment from '../component/Segment';
import './About.css';

const Social: React.FC = () => {
    return (
        <div id="social">
            <Row>
                <Col>
                    <a href="mailto:ddsoyka@pm.me">
                        <Images.Mail className="social-icon" title="Email" />
                    </a>
                </Col>
                <Col>
                    <a href="https://www.facebook.com/ddsoyka">
                        <Images.Facebook className="social-icon" title="Facebook" />
                    </a>
                </Col>
                <Col>
                    <a href="https://www.facebook.com/ddsoyka">
                        <Images.Twitter className="social-icon" title="Twitter" />
                    </a>
                </Col>
            </Row>
        </div>
    );
};

const About: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Group} title="About" />
                <Header.Title>About</Header.Title>
            </Header>
            <Segment>
                <h3>Contact Us</h3>
                <br />
                <Social />
            </Segment>
        </>
    );
};

export default About;