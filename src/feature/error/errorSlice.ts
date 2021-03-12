import * as Toolkit from '@reduxjs/toolkit';
import { isRejectedAction } from '../../utility';

type ErrorState = Error | null;

export const initialState = null as ErrorState;

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: initialState,
    reducers: {
        setError: (_, action: Toolkit.PayloadAction<ErrorState>) => action.payload
    },
    extraReducers: builder => {
        builder.addMatcher(
            isRejectedAction,
            (_, action) => action.error as Error
        );
    }
});

export const { setError } = errorSlice.actions;

export default errorSlice;
