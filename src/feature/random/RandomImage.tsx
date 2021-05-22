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
import { error } from '../../utility';
import * as State from '../../app/store';
import Wrapper from '../../component/Wrapper';
import SpinnerButton from '../../component/SpinnerButton';
import { setError } from '../error/errorSlice';
import { createRandomImage, saveRandomData } from './randomSlice';
import useImageBlob from '../../hook/useImageBlob';
import './RandomImage.css';

const MAXIMUM_WIDTH = 2048;
const MAXIMUM_HEIGHT = 2048;
const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const DEFAULT_TYPE = 'png';
const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

const RandomImage: React.FC = () => {
    const [type, setType] = React.useState<'png' | 'jpeg' | 'bmp'>(DEFAULT_TYPE);
    const [width, setWidth] = React.useState(DEFAULT_WIDTH);
    const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
    const [grayscale, setGrayscale] = React.useState(true);

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const [url, blob, setValue] = useImageBlob();

    const save = () => {
        if (!blob) return;

        const argument = {
            type: type,
            data: blob as Blob
        };

        dispatch(saveRandomData(argument));
    };

    const reset = () => {
        setValue(null);
        setType(DEFAULT_TYPE);
        setWidth(DEFAULT_WIDTH);
        setHeight(DEFAULT_HEIGHT);
        setGrayscale(true);
    };

    const onSubmit = async () => {
        const argument = {
            mime: `image/${type}` as 'image/png' | 'image/jpeg' | 'image/bmp',
            width: width,
            height: height,
            grayscale: grayscale
        };

        try {
            const action = await dispatch(createRandomImage(argument));
            const result = Toolkit.unwrapResult(action);

            setValue(result);
        }
        catch (exception) {
            error(exception);
            dispatch(setError(exception));
        }
    };

    return (
        <Wrapper>
            <Row className="py-5 mx-0">
                <Col sm />
                <Col sm={6}>
                    <Image
                        id="output"
                        className="bg-light border p-1 w-100"
                        src={!url.length ? BLANK_IMAGE : url}
                        alt="Output"
                    />
                </Col>
                <Col sm />
            </Row>
            <Row className="pb-5 mx-0">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="resolution-label">Width</InputGroup.Text>
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
                </Col>
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="resolution-label">Height</InputGroup.Text>
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
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={3} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="png"
                        type="radio"
                        label="PNG"
                        checked={type === 'png'}
                        onChange={() => setType('png')}
                    />
                </Col>
                <Col xs={12} md={3} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="jpeg"
                        type="radio"
                        label="JPEG"
                        checked={type === 'jpeg'}
                        onChange={() => setType('jpeg')}
                    />
                </Col>
                <Col xs={12} md={3} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="bmp"
                        type="radio"
                        label="Bitmap"
                        checked={type === 'bmp'}
                        onChange={() => setType('bmp')}
                    />
                </Col>
                <Col xs={12} md={3} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="symbols"
                        type="switch"
                        label="Grayscale"
                        checked={grayscale}
                        onChange={() => setGrayscale(!grayscale)}
                    />
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={4} className="pb-3 pb-md-0">
                    <SpinnerButton
                        className="w-100"
                        active={loading === 'create'}
                        disabled={loading !== 'none'}
                        onClick={onSubmit}>
                        Generate
                    </SpinnerButton>
                </Col>
                <Col xs={6} md={4}>
                    <SpinnerButton
                        className="w-100"
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={loading !== 'none' || !url.length}
                        onClick={save}>
                        Save
                    </SpinnerButton>
                </Col>
                <Col xs={6} md={4}>
                    <Button
                        className="w-100"
                        variant="secondary"
                        disabled={loading !== 'none'}
                        onClick={reset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default RandomImage;
