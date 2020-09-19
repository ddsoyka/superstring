import React from 'react';
import * as Test from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import App from './App';

test('renders the home page', () => {
    const store = {
        getState: jest.fn().mockReturnValue({}),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        replaceReducer: jest.fn()
    }
    const element = <ReactRedux.Provider store={store as unknown as Redux.Store}><App /></ReactRedux.Provider>;
    const { getByText } = Test.render(element);
    const text = getByText(/v0.1.0/i);
    expect(text).toBeInTheDocument();
});