import React from 'react';
import {
    Button,
    ButtonProps,
    Spinner
}
from 'react-bootstrap';

interface SpinnerButtonProps {
    active: boolean
    alt?: string
}

const SpinnerButton: React.FC<ButtonProps & SpinnerButtonProps> = (props) => {
    return (
        <Button {...props}>
            {
                !props.active &&
                props.children
            }
            {
                props.active &&
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">{props.alt}</span>
                </>
            }
        </Button>
    );
};

export default SpinnerButton;