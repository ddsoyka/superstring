import React, {
    Component
}
from 'react';
import {
    Container,
    Row,
    ListGroup
}
from 'react-bootstrap';
import Images from './Images';

class Help extends Component {
    render() {
        return (
            <>
                <header>
                    <Container as="section">
                        <Row className="justify-content-center">
                            <Images.Help className="header-image" title="Help" />
                        </Row>
                        <Row className="justify-content-center">
                            <h1 className="header-title">Help</h1>
                        </Row>
                        <Row className="justify-content-center">
                            <p className="header-description">
                                Find information and guidance here.
                            </p>
                        </Row>
                    </Container>
                </header>
                <Container id="table-of-contents" className="segment" as="section">
                    <h3>Table of Contents</h3>
                    <br />
                    <ListGroup>
                        <ListGroup.Item>
                            <a href="#security">Security</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
                <Container id="security" className="segment" as="section">
                    <h3>Security</h3>
                    <br />
                    <p>
                    All code with a cryptographic function is provided solely by the client machine,
                    and therefore the quality of the entropy used to generate random data will depend on the user.
                    </p>
                    <p>
                    No data created by this web application are transmitted outside of the client machine.
                    </p>
                    <p>
                    It is advised that all users perform an audit of the code in use by this web application themselves,
                    or else rely on a trusted professional third-party assessment.
                    </p>
                </Container>
            </>
        );
    }
}

export default Help;