import React from 'react';
import * as ReactRedux from 'react-redux';
import FileSaver from 'file-saver';
import {
    Modal,
    Button,
    Card,
    ListGroup
}
from 'react-bootstrap';
import * as State from '../../app/store';
import * as Utility from '../../api/utility';
import {hideDownload} from './fileSlice';

const Download: React.FC = () => {
    const { show, download } = ReactRedux.useSelector((state: State.RootState) => state.file);

    const dispatch = ReactRedux.useDispatch<State.AppDispatch>();

    const save = () => {
        if (!download.data) throw Error('No data to save');

        FileSaver.saveAs(download.data, `${download.hash}.${download.type}`)

        dispatch(hideDownload());
    };

    return (
        <Modal show={show === 'download'} onHide={() => dispatch(hideDownload())} centered>
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
                                {download.hash?.match(/.{2}/g)?.join(':')}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Type:</b>
                                <br />
                                {download.type?.toUpperCase()}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Size:</b>
                                <br />
                                {Utility.humanize(download.data?.size)}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button as="a" variant="primary" onClick={save}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Download;
