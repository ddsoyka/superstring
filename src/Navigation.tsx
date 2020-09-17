import React, {
    Component
}
from 'react';
import {
    Link
}
from 'react-router-dom';
import {
    connect,
    ConnectedProps
}
from 'react-redux';
import {
    Navbar,
    Nav,
    NavDropdown,
    Container
}
from 'react-bootstrap';
import {
    showLanguages
}
from './Actions';
import State from './State';
import Images from './Images';
import Language from './Language';
import './Navigation.css';

const mapStateToProps = (state: State) => {
    return {
        language: state.language
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        show: () => dispatch(showLanguages())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Properties = ConnectedProps<typeof connector>

class Navigation extends Component<Properties> {
    render() {
        const getImage = () => {
            switch (this.props.language) {
                case Language.EN_US:
                    return <Images.US className="icon" height="1.5rem" width="1.5rem" title="United States of America"/>;
                case Language.EN_GB:
                    return <Images.GB className="icon" height="1.5rem" width="1.5rem" title="United Kingdom"/>;
                case Language.EN_CA:
                    return <Images.CA className="icon" height="1.5rem" width="1.5rem" title="Canada"/>;
                default:
                    return <Images.Language className="icon" height="1.5rem" width="1.5rem" title="Unknown"/>;
            }
        };

        return (
            <Navbar className="navigation">
                <Container as="section">
                    <Link to="/">
                        <Navbar.Brand>
                            <Images.Logo className="logo" height="2rem" title="The logo for this web application" />
                            Superstring
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <NavDropdown title="Tools" id="tools">
                                    <Link className="dropdown-item" to="/random">Random</Link>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/about">About</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/help">Help</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.props.show}>
                                    {
                                        getImage()
                                    }
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="https://github.com/ddsoyka/superstring">
                                    <Images.GitHub className="icon" height="1.5rem" title="GitHub" />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default connector(Navigation);