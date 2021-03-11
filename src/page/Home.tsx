import React from 'react';
import Logo from '../image/logo.svg';
import Header from '../component/Header';
import Segment from '../component/Segment';

const Home: React.FC = () => {
    const major = process.env.PROJECT_VERSION_MAJOR;
    const minor = process.env.PROJECT_VERSION_MINOR;
    const patch = process.env.PROJECT_VERSION_PATCH;
    const version = `v${major}.${minor}.${patch}`;
    return (
        <>
            <Header>
                <Header.Image src={Logo} title="Superstring" />
                <Header.Title>Superstring</Header.Title>
                <Header.Body>
                    <p>
                        Welcome to Superstring!
                        <br />
                        <i><small>{version}</small></i>
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
