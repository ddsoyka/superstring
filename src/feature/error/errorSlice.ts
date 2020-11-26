import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../random/randomSlice';

type ErrorState = Error | null;

export const initialState = null as ErrorState;

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: initialState,
    reducers: {
        setError: (_, action: Toolkit.PayloadAction<ErrorState>) => action.payload
    },
    extraReducers: builder => {
        builder.addCase(Random.loadDictionary.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomString.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomWords.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomImage.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.saveRandomData.rejected, (_, action) => action.error as Error);
    }
});

export const {setError} = errorSlice.actions;

export default errorSlice;
