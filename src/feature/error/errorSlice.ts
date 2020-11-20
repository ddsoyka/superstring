import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../random/randomSlice';

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError: (state, action: Toolkit.PayloadAction<Error | null>) => {
            state = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(Random.loadDictionary.rejected, (state, action) => {
            state = action.error as Error;
        });
        builder.addCase(Random.createRandomString.rejected, (state, action) => {
            state = action.error as Error;
        });
        builder.addCase(Random.createRandomWords.rejected, (state, action) => {
            state = action.error as Error;
        });
        builder.addCase(Random.createRandomImage.rejected, (state, action) => {
            state = action.error as Error;
        });
        builder.addCase(Random.saveRandomData.rejected, (state, action) => {
            state = action.error as Error;
        });
    }
});

export default errorSlice;