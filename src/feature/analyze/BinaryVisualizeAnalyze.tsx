import React from 'react';
import * as Toolkit from '@reduxjs/toolkit';
import * as ReactRedux from 'react-redux';
import {
    Row,
    Col,
    Button,
    Form,
    Image
}
from 'react-bootstrap';
import * as State from '../../app/store';
import * as Utility from '../../api/utility';
import Wrapper from '../../component/Wrapper';
import SpinnerButton from '../../component/SpinnerButton';
import { renderBinaryData, saveAnalysisData, VisualizeBinaryDataArgument } from './analyzeSlice';
import { setError } from '../error/errorSlice';

const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const MAXIMUM_SIZE = 2500000;

const BinaryVisualizeAnalyze: React.FC = () => {
    const [image, setImage] = React.useState(BLANK_IMAGE);
    const [files, setFiles] = React.useState<FileList | null>(null)

    const loading = ReactRedux.useSelector((state: State.RootState) => state.random.loading);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const save = () => {
        const argument = {
            type: 'image/png',
            data: image
        };

        dispatch(saveAnalysisData(argument));
    };

    const reset = () => {
        setImage(BLANK_IMAGE);
    };

    const onSubmit = async () => {
        try {
            if (!files) {
                Utility.debug('No file was selected by the user')
            }
            else {
                const file = files[0];

                Utility.debug(`Ready to upload "${file.name}" which is ${Utility.humanize(file.size)}`);

                // Throw an exception if the file size is out of bounds.
                if (file.size < 1) throw Error(`${file.name} is an empty file`);
                if (file.size > MAXIMUM_SIZE) throw Error(`The input file size of ${Utility.humanize(file.size)} is too large`);

                setImage(BLANK_IMAGE);

                // Read file into memory.
                const data = await file.arrayBuffer();
                const argument: VisualizeBinaryDataArgument = {
                    mime: 'image/png',
                    data: new Uint8Array(data)
                };

                // Render the image.
                const action = await dispatch(renderBinaryData(argument));
                const result = Toolkit.unwrapResult(action);

                setImage(result);
            }
        }
        catch (error) {
            Utility.error(error);
            dispatch(setError(error));
        }
    };

    return (
        <Wrapper>
            <Row className="py-5 mx-0">
                <Col sm />
                <Col sm={6}>
                    <Image id="output" className="bg-light border p-1 w-100" src={image} alt="Output" />
                </Col>
                <Col sm />
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col className="d-flex justify-content-md-center">
                    <Form.File
                        id="file-selector"
                        label="Select a file to analyze."
                        onChange={(event: any) => setFiles(event.target.files)}/>
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={4} className="pb-3 pb-md-0">
                    <SpinnerButton
                        className="w-100"
                        active={loading === 'create'}
                        disabled={loading !== 'none' || !files}
                        onClick={onSubmit}>
                        Generate
                    </SpinnerButton>
                </Col>
                <Col xs={6} md={4}>
                    <SpinnerButton
                        className="w-100"
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={loading !== 'none' || image === BLANK_IMAGE}
                        onClick={save}>
                        Save
                    </SpinnerButton>
                </Col>
                <Col xs={6} md={4}>
                    <Button
                        className="w-100"
                        variant="secondary"
                        disabled={loading !== 'none' || image === BLANK_IMAGE}
                        onClick={reset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default BinaryVisualizeAnalyze;