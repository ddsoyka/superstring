import React from 'react';
import * as ReactRedux from 'react-redux';
import {
    Modal,
    Button,
    Card,
    ListGroup
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
                <Card>
                    <Card.Body>
                        <Card.Title>Your file is ready to download!</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <b>Hash:</b>
                                <br />
                                {download.hash}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Type:</b>
                                <br />
                                {download.type?.toUpperCase()}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Size:</b>
                                <br />
                                {download.data?.length} Bytes
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
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