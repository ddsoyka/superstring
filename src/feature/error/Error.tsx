import React from 'react';
import {
    Alert
}
from 'react-bootstrap';
import * as ReactRedux from 'react-redux';
import * as State from '../../app/store';
import {setError} from './errorSlice';

const Errors: React.FC = () => {
    const error = ReactRedux.useSelector((state: State.RootState) => state.error);
    const dispatch = ReactRedux.useDispatch<State.AppDispatch>()

    return (
        <Alert
            show={!!error}
            dismissible={true}
            variant="danger"
            onClose={() => dispatch(setError(null))}>
            <Alert.Heading>
                {error?.name}
            </Alert.Heading>
            {error?.message}
        </Alert>
    );
};

export default Errors;
