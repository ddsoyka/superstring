import React from 'react';
import * as ReactRedux from 'react-redux';
import {
    Modal,
    Carousel,
    Button
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Language from '../../api/Language';
import Images from '../../image';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
    const {show, language} = ReactRedux.useSelector((state: State.RootState) => state.i18n);

    const [index, setIndex] = React.useState(Object.keys(Language).indexOf(language || Language.EN_US));

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    const save = () => {
        dispatch(State.hideLanguages());

        const language = Object.values(Language)[index];
        
        dispatch(State.setLanguage(language));

        localStorage.setItem('language', language);
    };

    return (
        <Modal show={show} onHide={() => dispatch(State.hideLanguages())} centered>
            <Modal.Header closeButton>
                <Modal.Title>Language</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel interval={null} activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)}>
                        <Carousel.Item >
                            <Images.US className="flag d-block w-100" height="15rem" title="United States of America" />
                            <Carousel.Caption>
                                <h3>English</h3>
                                <p>USA</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Images.GB className="flag d-block w-100" height="15rem" title="United Kingdom" />
                            <Carousel.Caption>
                                <h3>English</h3>
                                <p>United Kingdom</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Images.CA className="flag d-block w-100" height="15rem" title="Canada" />
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
