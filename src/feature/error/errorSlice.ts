import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../../api/random';

const errorSlice = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError(state, action) {
            state = action.payload
        }
    },
    extraReducers: {
        [Random.loadDictionary.rejected.type]: (state, action) => {
            state = action.error
        },
        [Random.createRandomString.rejected.type]: (state, action) => {
            state = action.error
        }
    }
});

export default errorSlice;