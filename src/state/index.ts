import * as Redux from 'redux';
import * as Toolkit from '@reduxjs/toolkit';
import JSZip from 'jszip';
import Language from "../api/Language";

interface Definitions {
    i18n: {
        show?: boolean,
        language?: Language
    }
}

export const loadDictionary = Toolkit.createAsyncThunk('dictionary/load', async (language: Language) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/english.zip`);

    if (!response.ok) throw Error(`Failed to fetch dictionary from ${response.url}`);

    const blob = await response.blob();
    
    if (blob.type !== 'application/zip') throw Error(`File is not an archive (${blob.type})`);

    const zip = await JSZip.loadAsync(blob);

    const file = zip.file('english.txt');

    if (file === null) throw Error('Corrupt archive');

    const text = await file.async('string');

    const dictionary = text.split('\n');
    const set = new Set(dictionary);
    const sorted = Array.from(set).sort();

    console.log(`Fetched language pack for ${language} with ${sorted.length} words`);

    return sorted;
});

const i18n = Toolkit.createSlice({
    name: 'i18n',
    initialState: null as Definitions['i18n'] | null,
    reducers: {
        setLanguage: (state, action) => ({
            ...state,
            language: action.payload
        }),
        showLanguages: (state) => ({
            ...state,
            show: true
        }),
        hideLanguages: (state) => ({
            ...state,
            show: false
        })
    }
});

const dictionary = Toolkit.createSlice({
    name: 'dictionary',
    initialState: null as string[] | null,
    reducers: {},
    extraReducers: {
        [loadDictionary.fulfilled.type]: (state, action) => action.payload
    }
});

const error = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError: (state, action) => action.payload
    },
    extraReducers: {
        [loadDictionary.rejected.type]: (state, action) => action.error
    }
});

export const { setLanguage, showLanguages, hideLanguages } = i18n.actions;
export const { setError } = error.actions;

export const Reducer = Redux.combineReducers({
    i18n: i18n.reducer,
    dictionary: dictionary.reducer,
    error: error.reducer
});

export type RootState = ReturnType<typeof Reducer>;