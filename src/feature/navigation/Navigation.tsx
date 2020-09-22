import React from 'react';
import * as ReactRedux from 'react-redux';
import {
    Link,
    NavLink
}
from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavDropdown,
    Container
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Images from '../../image';
import Language from '../../api/Language';
import './Navigation.css';

const Navigation: React.FC = () => {
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const getImage = () => {
        switch (language) {
            case Language.EN_US:
                return <Images.US className="nav-icon" title="United States of America"/>;
            case Language.EN_GB:
                return <Images.GB className="nav-icon" title="United Kingdom"/>;
            case Language.EN_CA:
                return <Images.CA className="nav-icon" title="Canada"/>;
            default:
                return <Images.Language className="nav-icon" title="Unknown"/>;
        }
    };

    return (
        <Navbar expand="sm" sticky="top" className="bg-light border-bottom">
            <Container as="section">
                <Navbar.Brand as={Link} to="/">
                    <Images.Logo className="d-inline-block align-top mr-2" height="30" width="30" title="Superstring"/>
                    Superstring
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title="Tools" id="tools">
                            <NavDropdown.Item as={NavLink} to="/random">Random</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/help">Help</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => dispatch(State.showLanguages())}>
                                {getImage()}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="https://github.com/ddsoyka/superstring">
                                <Images.GitHub className="nav-icon" title="GitHub"/>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;