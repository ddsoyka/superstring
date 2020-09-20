import React from 'react';
import Images from '../image';
import Header from './Header';
import Segment from './Segment';

const Home: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.Logo} title="Superstring" />
                <Header.Title>Superstring</Header.Title>
                <Header.Body>
                    <p>
                        Welcome to Superstring!
                        <br />
                        <i><small>v0.1.0</small></i>
                    </p>
                </Header.Body>
            </Header>
            <Segment>
                <p>
                    A collection of tools for generating and manipulating strings.
                </p>
            </Segment>
        </>
    );
};

export default Home;