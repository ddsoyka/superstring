import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Row,
    Col,
    Button,
    Form,
    Image,
    InputGroup,
    Tab,
    Nav
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Wrapper from '../../component/Wrapper';
import SpinnerButton from '../../component/SpinnerButton';
import { createRandomImage, saveRandomData } from './randomSlice';

const MAXIMUM_WIDTH = 32768;
const MAXIMUM_HEIGHT = 32768;
const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const DEFAULT_TYPE = 'png';
const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

const RandomImage: React.FC = () => {
    const [image, setImage] = React.useState(BLANK_IMAGE);
    const [type, setType] = React.useState<'png' | 'jpeg' | 'bmp'>(DEFAULT_TYPE);
    const [width, setWidth] = React.useState(DEFAULT_WIDTH);
    const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
    const [key, setKey] = React.useState('output');

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const save = () => {
        const argument = {
            type: type,
            data: image
        };

        dispatch(saveRandomData(argument));
    };

    const reset = () => {
        setImage(BLANK_IMAGE);
        setType(DEFAULT_TYPE);
        setWidth(DEFAULT_WIDTH);
        setHeight(DEFAULT_HEIGHT);
    };

    const onSubmit = async () => {
        setImage(BLANK_IMAGE);

        const argument = {
            mime: `image/${type}` as 'image/png' | 'image/jpeg' | 'image/bmp',
            width: width,
            height: height
        };

        try {
            const action = await dispatch(createRandomImage(argument));
            const result = Toolkit.unwrapResult(action);

            setImage(result);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Wrapper>
            <Row className="py-3">
                <Col>
                    <Tab.Container activeKey={key} id="tabs" onSelect={key => setKey(key as string)}>
                        <Wrapper>
                            <Row className="mb-3">
                                <Col className="flex-grow-0 flex-md-grow-1" />
                                <Nav as={Col} variant="tabs">
                                    <Nav.Item className="flex-grow-1">
                                        <Nav.Link eventKey="output">Output</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-grow-1">
                                        <Nav.Link eventKey="options">Options</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Col className="flex-grow-0 flex-md-grow-1" />
                            </Row>
                            <Row>
                                <Tab.Content as={Col}>
                                    <Tab.Pane eventKey="output" title="Output">
                                        <Wrapper>
                                            <Row>
                                                <Col sm/>
                                                <Col sm={6}>
                                                    <Image className="bg-light border p-1 w-100" src={image} alt="Output" />
                                                </Col>
                                                <Col sm/>
                                            </Row>
                                        </Wrapper>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="options" title="Options">
                                        <Wrapper>
                                            <InputGroup className="pb-4">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Width</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    id="width"
                                                    type="number"
                                                    min={1}
                                                    max={MAXIMUM_WIDTH}
                                                    value={width}
                                                    onChange={(e) => setWidth(parseInt(e.target.value))}
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="secondary" onClick={() => setWidth(MAXIMUM_WIDTH)}>Max</Button>
                                                    <Button variant="secondary" onClick={() => setWidth(1)}>Min</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <InputGroup className="pb-4">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Height</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    id="height"
                                                    type="number"
                                                    min={1}
                                                    max={MAXIMUM_HEIGHT}
                                                    value={height}
                                                    onChange={(e) => setHeight(parseInt(e.target.value))}
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="secondary" onClick={() => setHeight(MAXIMUM_HEIGHT)}>Max</Button>
                                                    <Button variant="secondary" onClick={() => setHeight(1)}>Min</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Row className="pb-4 justify-content-center">
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="png"
                                                        type="radio"
                                                        label="PNG"
                                                        checked={type === 'png'}
                                                        onChange={() => setType('png')}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="jpeg"
                                                        type="radio"
                                                        label="JPEG"
                                                        checked={type === 'jpeg'}
                                                        onChange={() => setType('jpeg')}
                                                    />
                                                </Col>
                                                <Col className="flex-grow-0">
                                                    <Form.Check
                                                        id="bmp"
                                                        type="radio"
                                                        label="Bitmap"
                                                        checked={type === 'bmp'}
                                                        onChange={() => setType('bmp')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Wrapper>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Wrapper>
                    </Tab.Container>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="flex-grow-0">
                    <SpinnerButton active={loading === 'create'} onClick={onSubmit}>Generate</SpinnerButton>
                </Col>
                <Col className="flex-grow-0">
                    <SpinnerButton
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={image === BLANK_IMAGE}
                        onClick={save}>
                            Save
                    </SpinnerButton>
                </Col>
                <Col className="flex-grow-0">
                    <Button variant="secondary" onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default RandomImage;