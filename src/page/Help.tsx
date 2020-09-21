import React from 'react';
import {
    ListGroup
}
from 'react-bootstrap';
import Images from '../image';
import Header from '../component/Header';
import Segment from '../component/Segment';

const TableofContents: React.FC = () => {
    return (
        <Segment id="table-of-contents">
            <h3>Table of Contents</h3>
            <br />
            <ListGroup>
                <ListGroup.Item>
                    <a href="#security">Security</a>
                </ListGroup.Item>
            </ListGroup>
        </Segment>
    );
};

const Help: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Help} title="Help" />
                <Header.Title>Help</Header.Title>
                <Header.Body>
                    <p>
                        Find information and guidance here.
                    </p>
                </Header.Body>
            </Header>
            <TableofContents />
            <Segment>
                <h3 id="security">Security</h3>
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
            </Segment>
        </>
    );
};

export default Help;