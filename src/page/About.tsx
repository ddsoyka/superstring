import React from 'react';
import {
    Row,
    Col,
    ListGroup
}
from 'react-bootstrap';
import Mail from '../image/mail.svg';
import Facebook from '../image/facebook.svg';
import Twitter from '../image/twitter.svg';
import Group from '../image/group.svg';
import Header from '../component/Header';
import Segment from '../component/Segment';
import './About.css';

const Social: React.FC = () => {
    return (
        <div id="social">
            <Row>
                <Col>
                    <a href="mailto:ddsoyka@pm.me">
                        <Mail className="social-icon" title="Email" />
                    </a>
                </Col>
                <Col>
                    <a href="https://www.facebook.com/ddsoyka">
                        <Facebook className="social-icon" title="Facebook" />
                    </a>
                </Col>
                <Col>
                    <a href="https://twitter.com/ddsoyka">
                        <Twitter className="social-icon" title="Twitter" />
                    </a>
                </Col>
            </Row>
        </div>
    );
};

const About: React.FC = () => {
    const major = process.env.PROJECT_VERSION_MAJOR;
    const minor = process.env.PROJECT_VERSION_MINOR;
    const patch = process.env.PROJECT_VERSION_PATCH;
    const tweak = process.env.PROJECT_VERSION_TWEAK;
    const version = `${major}.${minor}.${patch}.${tweak}`;
    return (
        <>
            <Header>
                <Header.Image src={Group} title="About" />
                <Header.Title>About</Header.Title>
            </Header>
            <Segment>
                <h3>Version</h3>
                <br />
                <ListGroup>
                    <ListGroup.Item>
                        <h4>Branch:</h4>
                        <br />
                        <h5>{process.env.PROJECT_VERSION_BRANCH}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Version:</h4>
                        <br />
                        <h5>{version}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Commit:</h4>
                        <br />
                        <h5>{process.env.PROJECT_VERSION_HASH}</h5>
                    </ListGroup.Item>
                </ListGroup>
            </Segment>
            <Segment>
                <h3>Contact Us</h3>
                <br />
                <Social />
            </Segment>
        </>
    );
};

export default About;
