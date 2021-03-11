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
    NavDropdown
}
from 'react-bootstrap';
import * as State from '../../app/store';
import US from '../../image/usa.svg';
import GB from '../../image/uk.svg';
import CA from '../../image/canada.svg';
import Language from '../../image/language.svg'
import Logo from '../../image/logo.svg'
import GitHub from '../../image/github.svg'
import Languages from '../../api/Languages';
import { showLanguages } from '../i18n/i18nSlice';
import './Navigation.css';

const Navigation: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);

    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const getImage = () => {
        switch (language) {
            case Languages.EN_US:
                return <US className="nav-icon" title="United States of America" />;
            case Languages.EN_GB:
                return <GB className="nav-icon" title="United Kingdom" />;
            case Languages.EN_CA:
                return <CA className="nav-icon" title="Canada" />;
            default:
                return <Language className="nav-icon" title="Unknown" />;
        }
    };

    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="sm"
            sticky="top"
            expanded={expanded}
            onToggle={value => setExpanded(value)}
            onSelect={() => setExpanded(false)}>
            <Navbar.Toggle />
            <Navbar.Brand as={Link} to="/">
                <Logo height="32" width="32" title="Superstring" />
            </Navbar.Brand>
            <div className="d-none d-sm-block flex-grow-1" />
            <a href="https://github.com/ddsoyka/superstring" className="mr-sm-3">
                <GitHub height="32" width="32" title="GitHub" />
            </a>
            <Navbar.Collapse className="flex-grow-0">
                <Nav>
                    <NavDropdown title="Tools" id="tools">
                        <NavDropdown.Item as={NavLink} to="/random">Random</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/convert">Convert</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/calculator">Calculator</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/analyze">Analyze</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/help">Help</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => dispatch(showLanguages())}>
                            <span className="d-sm-none mr-3">Language</span>
                            {getImage()}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
