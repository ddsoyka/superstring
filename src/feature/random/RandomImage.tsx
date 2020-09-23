import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Row,
    Col,
    Button,
    Form,
    Image,
    InputGroup
}
from 'react-bootstrap';
import * as State from '../../app/store';
import Header from '../../component/Header';
import Segment from '../../component/Segment';
import SpinnerButton from '../../component/SpinnerButton';
import { createRandomImage, saveRandomData } from './randomSlice';

const MAXIMUM_WIDTH = 32768;
const MAXIMUM_HEIGHT = 32768;
const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

const RandomImage: React.FC = () => {
    const [image, setImage] = React.useState(BLANK_IMAGE);
    const [type, setType] = React.useState<'png' | 'jpeg' | 'bmp'>('png');
    const [width, setWidth] = React.useState(512);
    const [height, setHeight] = React.useState(512);

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
        setType('png');
        setWidth(512);
        setHeight(512);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();

        setImage(BLANK_IMAGE);

        const argument = {
            mime: `image/${type}` as 'image/png' | 'image/jpeg' | 'image/bmp',
            width: width,
            height: height
        };
        const action = await dispatch(createRandomImage(argument));
        const result = Toolkit.unwrapResult(action);
        
        setImage(result);
    };
    
    return (
        <>
            <Header>
                <Header.Title>Random Image</Header.Title>
            </Header>
            <Segment>
                <Form className="border p-5" onSubmit={(e) => onSubmit(e)}>
                    <fieldset className="pb-1 text-center">
                        <legend>Output</legend>
                        <Image className="bg-light border p-3 w-100 h-auto" src={image} alt="Output" />
                    </fieldset>
                    <br />
                    <fieldset className="pb-1" disabled={loading !== 'none'}>
                        <legend>Options</legend>
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
                        <Row className="justify-content-center">
                            <Col className="flex-grow-0">
                                <SpinnerButton active={loading === 'create'} type="submit">Generate</SpinnerButton>
                            </Col>
                            <Col className="flex-grow-0">
                                <SpinnerButton
                                    variant="secondary"
                                    active={loading === 'save'}
                                    disabled={image === ''}
                                    onClick={save}>
                                        Save
                                </SpinnerButton>
                            </Col>
                            <Col className="flex-grow-0">
                                <Button variant="secondary" onClick={reset}>Reset</Button>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </Segment>
        </>
    );
};

export default RandomImage;