import * as Toolkit from '@reduxjs/toolkit';
import * as Random from '../../api/random';

const randomSlice = Toolkit.createSlice({
    name: 'random',
    initialState: {
        dictionary: null as string[] | null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [Random.loadDictionary.fulfilled.type]: (state, action) => {
            state.dictionary = action.payload;
            state.isLoading = false;
        },
        [Random.loadDictionary.pending.type]: state => {
            state.isLoading = true;
        },
        [Random.loadDictionary.rejected.type]: state => {
            state.isLoading = false;
        },
        [Random.createRandomString.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [Random.createRandomString.pending.type]: state => {
            state.isLoading = true;
        },
        [Random.createRandomString.rejected.type]: state => {
            state.isLoading = false;
        },
        [Random.createRandomImage.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [Random.createRandomImage.pending.type]: state => {
            state.isLoading = true;
        },
        [Random.createRandomImage.rejected.type]: state => {
            state.isLoading = false;
        }
    }
});

export default randomSlice;