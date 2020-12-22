import React from 'react';
import {
    CardDeck
}
from 'react-bootstrap';
import Images from '../../image';
import Header from '../../component/Header';
import Segment from '../../component/Segment';

const Convert: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Convert} title="Convert" />
                <Header.Title>Convert</Header.Title>
                <Header.Body>
                    <p>
                        Tools for converting data.
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <CardDeck>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Convert;
