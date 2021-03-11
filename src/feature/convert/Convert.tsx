import React from 'react';
import {
    CardDeck
}
from 'react-bootstrap';
import Icon from '../../image/convert.svg';
import Header from '../../component/Header';
import Segment from '../../component/Segment';

const Convert: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Icon} title="Convert" />
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
