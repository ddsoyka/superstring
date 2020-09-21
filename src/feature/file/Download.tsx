import React from 'react';
import * as ReactRedux from 'react-redux';
import {
    Modal,
    Button
}
    from 'react-bootstrap';
import * as State from '../../app/store';

const Download: React.FC = () => {
    const { show, download } = ReactRedux.useSelector((state: State.RootState) => state.file);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    return (
        <Modal show={show === 'download'} onHide={() => dispatch(State.hideDownload())} centered>
            <Modal.Header closeButton>
                <Modal.Title>Download</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your download is ready.
            </Modal.Body>
            <Modal.Footer>
                <Button
                    as="a"
                    variant="primary"
                    href={download.data}
                    download={`${download.hash}.${download.type}`}
                    onClick={() => dispatch(State.hideDownload())}>
                    Download
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Download;