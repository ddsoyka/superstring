import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import Logo from '../image/logo.svg';
import Random from '../image/random.svg';
import Convert from '../image/convert.svg';
import Calculator from '../image/calculator.svg';
import Analyze from '../image/analyze.svg';
import Header from '../component/Header';
import Segment from '../component/Segment';

function version(): string {
    const major = process.env.VERSION_MAJOR;
    const minor = process.env.VERSION_MINOR;
    const patch = process.env.VERSION_PATCH;
    return `${major}.${minor}.${patch}`;
}

const Home: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Logo} title="Superstring" />
                <Header.Title>Welcome to Superstring!</Header.Title>
                <Header.Subtitle>Version <code>{version()}</code></Header.Subtitle>
            </Header>
            <Segment>
                <h1 className="text-center">Tools</h1>
                <br />
                <CardDeck>
                    <Card as={Link} to="/random">
                        <Card.Img as={Random} width={128} height={128}/>
                        <Card.Body className="text-center">
                            <Card.Title>Random</Card.Title>
                            <Card.Text>
                                Create and save random text or image data.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card as={Link} to="/convert">
                        <Card.Img as={Convert} width={128} height={128}/>
                        <Card.Body className="text-center">
                            <Card.Title>Convert</Card.Title>
                            <Card.Text>
                                Convert data between different formats.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card as={Link} to="/calculator">
                        <Card.Img as={Calculator} width={128} height={128}/>
                        <Card.Body className="text-center">
                            <Card.Title>Calculator</Card.Title>
                            <Card.Text>
                                Perform calculations on data.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card as={Link} to="/analyze">
                        <Card.Img as={Analyze} width={128} height={128}/>
                        <Card.Body className="text-center">
                            <Card.Title>Analyze</Card.Title>
                            <Card.Text>
                                Analyze data in various formats.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Segment>
        </>
    );
};

export default Home;
