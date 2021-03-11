import React from 'react';
import * as ReactRedux from 'react-redux';
import {
    Modal,
    Carousel,
    Button
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Languages from '../../api/Languages';
import US from '../../image/usa.svg';
import GB from '../../image/uk.svg';
import CA from '../../image/canada.svg';
import {
    setLanguage,
    hideLanguages
}
from './i18nSlice';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
    const { show, language } = ReactRedux.useSelector((state: State.RootState) => state.i18n);

    const [index, setIndex] = React.useState(Object.values(Languages).indexOf(language || Languages.EN_US) - 1);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const save = () => {
        dispatch(hideLanguages());

        const language = Object.values(Languages)[index + 1];

        dispatch(setLanguage(language));
    };

    return (
        <Modal show={show} onHide={() => dispatch(hideLanguages())} centered>
            <Modal.Header closeButton>
                <Modal.Title>Language</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel interval={null} activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)}>
                    <Carousel.Item >
                        <US className="flag d-block w-100" title="United States of America" />
                        <Carousel.Caption>
                            <h3>English</h3>
                            <p>USA</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <GB className="flag d-block w-100" title="United Kingdom" />
                        <Carousel.Caption>
                            <h3>English</h3>
                            <p>United Kingdom</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CA className="flag d-block w-100" title="Canada" />
                        <Carousel.Caption>
                            <h3>English</h3>
                            <p>Canada</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={save}>Select</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LanguageSelector;
