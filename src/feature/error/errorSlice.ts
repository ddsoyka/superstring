import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../random/randomSlice';

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError: (_, action: Toolkit.PayloadAction<Error | null>) => action.payload
    },
    extraReducers: builder => {
        builder.addCase(Random.loadDictionary.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomString.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomWords.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.createRandomImage.rejected, (_, action) => action.error as Error);
        builder.addCase(Random.saveRandomData.rejected, (_, action) => action.error as Error);
    }
});

export default errorSlice;