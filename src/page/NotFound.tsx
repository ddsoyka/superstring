import React from 'react';
import Images from '../image';
import Header from '../component/Header';
import Segment from '../component/Segment';

const NotFound: React.FC = () => {
    return (
        <>
            <Header>
                <Header.Image src={Images.NotFound} title="Not Found" />
                <Header.Title>Not Found</Header.Title>
            </Header>
            <Segment>
                <h3 className="text-center">
                    Sorry, we couldn't find what you were looking for.
                </h3>
            </Segment>
        </>
    );
};

export default NotFound;