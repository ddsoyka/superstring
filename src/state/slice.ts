import * as Toolkit from '@reduxjs/toolkit';
import * as Thunk from './thunk';
import Language from '../api/Language';

export const i18n = Toolkit.createSlice({
    name: 'i18n',
    initialState: {
        show: false,
        language: null as Language | null
    },
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
        },
        showLanguages(state) {
            state.show = true
        },
        hideLanguages(state) {
            state.show = false
        }
    }
});

export const random = Toolkit.createSlice({
    name: 'random',
    initialState: {
        dictionary: null as string[] | null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [Thunk.loadDictionary.fulfilled.type]: (state, action) => {
            state.dictionary = action.payload;
            state.isLoading = false;
        },
        [Thunk.loadDictionary.pending.type]: state => {
            state.isLoading = true;
        },
        [Thunk.loadDictionary.rejected.type]: state => {
            state.isLoading = false;
        },
        [Thunk.createRandomString.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [Thunk.createRandomString.pending.type]: state => {
            state.isLoading = true;
        },
        [Thunk.createRandomString.rejected.type]: state => {
            state.isLoading = false;
        }
    }
});

export const error = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError(state, action) {
            state = action.payload
        }
    },
    extraReducers: {
        [Thunk.loadDictionary.rejected.type]: (state, action) => {
            state = action.error
        },
        [Thunk.createRandomString.rejected.type]: (state, action) => {
            state = action.error
        }
    }
});