import React from 'react';
import {
    connect,
    ConnectedProps
}
from 'react-redux';
import {
    Alert
}
from 'react-bootstrap';
import * as Actions from './Actions';
import State from './State';

const mapStateToProps = (state: State) => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hide: () => dispatch(Actions.setError(null))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Properties = ConnectedProps<typeof connector>

const Errors: React.FC<Properties> = (props: Properties) => {
    return (
        <Alert className="fixed-bottom" show={!!props.error} dismissible={true} variant="danger" onClose={props.hide}>
            <Alert.Heading>{props.error?.name}</Alert.Heading>
            {props.error?.message}
        </Alert>
    );
};

export default connector(Errors);