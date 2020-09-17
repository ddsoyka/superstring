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
        language: state.i18n?.language
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
                    return <Images.US className="icon" title="United States of America"/>;
                case Language.EN_GB:
                    return <Images.GB className="icon" title="United Kingdom"/>;
                case Language.EN_CA:
                    return <Images.CA className="icon" title="Canada"/>;
                default:
                    return <Images.Language className="icon" title="Unknown"/>;
            }
        };

        return (
            <Navbar className="navigation">
                <Container as="section">
                    <Link to="/">
                        <Navbar.Brand>
                            <Images.Logo className="d-inline-block align-top mr-2" height="30" width="30" title="Superstring"/>
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
                                    <Images.GitHub className="icon" title="GitHub"/>
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