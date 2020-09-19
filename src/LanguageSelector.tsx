import React, {
    useState
}
from 'react';
import {
    connect,
    ConnectedProps
}
from 'react-redux';
import {
    Modal,
    Carousel,
    Button
}
from 'react-bootstrap';
import * as State from './state';
import Language from './api/Language';
import Images from './image';
import './LanguageSelector.css';

const mapStateToProps = (state: State.RootState) => {
    return {
        language: state.i18n?.language,
        visible: state.i18n?.show
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        set: (language: Language) => dispatch(State.setLanguage(language)),
        hide: () => dispatch(State.hideLanguages())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Properties = ConnectedProps<typeof connector>

const LanguageSelector: React.FC<Properties> = (props: Properties) => {
    const [index, setIndex] = useState(Object.keys(Language).indexOf(props.language || Language.EN_US));
    const save = () => {
        props.hide();

        const language = Object.values(Language)[index];
        
        props.set(language);
        localStorage.setItem('language', language);
    };

    return (
        <Modal show={props.visible} onHide={props.hide} centered>
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

export default connector(LanguageSelector);
