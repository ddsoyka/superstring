import React from 'react';
import {
    connect,
    ConnectedProps
}
from 'react-redux';
import * as Bootstrap from 'react-bootstrap';
import * as State from './state';

const mapStateToProps = (state: State.RootState) => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hide: () => dispatch(State.setError(null))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Properties = ConnectedProps<typeof connector>

const Errors: React.FC<Properties> = (props: Properties) => {
    return (
        <Bootstrap.Alert className="fixed-bottom" show={!!props.error} dismissible={true} variant="danger" onClose={props.hide}>
            <Bootstrap.Alert.Heading>{props.error?.name}</Bootstrap.Alert.Heading>
            {props.error?.message}
        </Bootstrap.Alert>
    );
};

export default connector(Errors);