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
import Icon from '../image/about.svg';
import Header from '../component/Header';
import Segment from '../component/Segment';
import './About.css';

const date = new Date(process.env.BUILD_DATE);

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
    return (
        <>
            <Header>
                <Header.Image src={Icon} title="About" />
                <Header.Title>About</Header.Title>
            </Header>
            <Segment>
                <h3>Version</h3>
                <br />
                <ListGroup horizontal={'sm'}>
                    <ListGroup.Item>
                        <h5>Ref: <code>{process.env.VERSION_REF}</code></h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Version: <code>{process.env.VERSION}</code></h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Commit: <code>{process.env.VERSION_COMMIT}</code></h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Build Date: <code>{date.toLocaleString()}</code></h5>
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
