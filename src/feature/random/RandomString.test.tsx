import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Store from '../../app/store';
import RandomString from './RandomString';

test('creates random text', async () => {
    render(<Provider store={Store}><RandomString /></Provider>);
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => screen.getByText('Generate'));
    expect(screen.getByRole('textbox').textContent).toMatch(/.{10000}/);
});
