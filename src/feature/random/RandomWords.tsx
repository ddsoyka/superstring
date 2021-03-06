import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Toolkit from '@reduxjs/toolkit';
import {
    Form,
    Button,
    Row,
    Col,
    InputGroup
}
from 'react-bootstrap';
import MissingDictionary from './MissingDictionary';
import * as Utility from '../../api/utility';
import * as State from '../../app/store';
import SpinnerButton from '../../component/SpinnerButton';
import Wrapper from '../../component/Wrapper';
import {
    loadDictionary,
    createRandomWords,
    saveRandomData,
    setRetry
}
from './randomSlice';
import { setError } from '../error/errorSlice';

const MAXIMUM_LENGTH = 1000000;
const DEFAULT_SEPARATOR = ' ';
const DEFAULT_LENGTH = 1000;

const RandomWords: React.FC = () => {
    const [length, setLength] = React.useState(DEFAULT_LENGTH);
    const [separator, setSeparator] = React.useState(DEFAULT_SEPARATOR);
    const [output, setOutput] = React.useState('');

    const { loading, dictionary, retry } = ReactRedux.useSelector((state: State.RootState) => state.random);
    const language = ReactRedux.useSelector((state: State.RootState) => state.i18n.language);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const onSubmit = async () => {
        if (dictionary && language) {
            const arg = {
                count: length,
                separator: separator,
                collection: dictionary
            };

            try {
                const action = await dispatch(createRandomWords(arg));
                const result = Toolkit.unwrapResult(action);

                setOutput(result);
            }
            catch (error) {
                Utility.error(error);
                dispatch(setError(error));
            }
        }
    };

    const save = () => {
        const argument = {
            type: 'txt',
            data: output
        };

        dispatch(saveRandomData(argument));
    };

    const reset = () => {
        setLength(DEFAULT_LENGTH);
        setSeparator(DEFAULT_SEPARATOR);
        setOutput('');
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            Utility.debug(`Wrote ${output.length} characters to the clipboard`);
        }
        catch (error) {
            Utility.error(error);
            dispatch(setError(error));
        }
    };

    const repeat = () => {
        dispatch(setRetry(true));
        dispatch(setError(null));
    };

    if (language && !dictionary && retry) {
        dispatch(setRetry(false));
        dispatch(loadDictionary(language));
    }
    else if ((!language || !dictionary) && loading === 'none')
        return <MissingDictionary repeat={repeat} />;

    return (
        <Wrapper>
            <Row className="py-5 mx-0 w-100">
                <Col>
                    <Form.Control
                        id="output"
                        as="textarea"
                        value={output || ''}
                        rows={15}
                        readOnly
                    />
                </Col>
            </Row>
            <Row className="pb-5 mx-0">
                <Col>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Length</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            id="length"
                            type="number"
                            min={1}
                            max={MAXIMUM_LENGTH}
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={() => setLength(MAXIMUM_LENGTH)}>Max</Button>
                            <Button variant="secondary" onClick={() => setLength(1)}>Min</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={4} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="none"
                        type="radio"
                        label="None"
                        checked={separator === ""}
                        onChange={() => setSeparator("")}
                    />
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-md-center">
                    <Form.Check
                        id="space"
                        type="radio"
                        label="Space"
                        checked={separator === " "}
                        onChange={() => setSeparator(" ")}
                    />
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-md-center text-nowrap">
                    <Form.Check
                        id="newline"
                        type="radio"
                        label="New Line"
                        checked={separator === "\n"}
                        onChange={() => setSeparator("\n")}
                    />
                </Col>
            </Row>
            <Row className="pb-5 mx-0 justify-content-center align-items-center">
                <Col xs={12} md={3} className="pb-3 pb-md-0">
                    <SpinnerButton
                        className="w-100"
                        active={loading === 'create'}
                        disabled={loading !== 'none'}
                        onClick={onSubmit}>
                        Generate
                    </SpinnerButton>
                </Col>
                <Col xs={4} md={3}>
                    <Button
                        className="w-100"
                        variant="secondary"
                        disabled={loading !== 'none' || output === ''}
                        onClick={copy}>
                        Copy
                    </Button>
                </Col>
                <Col xs={4} md={3}>
                    <SpinnerButton
                        className="w-100"
                        variant="secondary"
                        active={loading === 'save'}
                        disabled={loading !== 'none' || output === ''}
                        onClick={save}>
                        Save
                    </SpinnerButton>
                </Col>
                <Col xs={4} md={3}>
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

export default RandomWords;
