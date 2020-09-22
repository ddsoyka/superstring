import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../random/randomSlice';

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError(state, action: Toolkit.PayloadAction<Error | null>) {
            state = action.payload
        }
    },
    extraReducers: {
        [Random.loadDictionary.rejected.type]: (state, action) => {
            state = action.error
        },
        [Random.createRandomString.rejected.type]: (state, action) => {
            state = action.error
        },
        [Random.createRandomWords.rejected.type]: (state, action) => {
            state = action.error
        },
        [Random.createRandomImage.rejected.type]: (state, action) => {
            state = action.error
        },
        [Random.saveRandomData.rejected.type]: (state, action) => {
            state = action.error
        }
    }
});

export default errorSlice;