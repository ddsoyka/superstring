import React from 'react';
import * as Test from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import Store from './store';
import App from './App';

test('renders the home page', () => {
    const element = <ReactRedux.Provider store={Store}><App /></ReactRedux.Provider>;
    const { getByText } = Test.render(element);
    const text = getByText(/Welcome to Superstring!/i);

    expect(text).toBeInTheDocument();
});