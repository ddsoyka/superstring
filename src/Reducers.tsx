import * as Redux from 'redux';
import * as Toolkit from '@reduxjs/toolkit';
import * as Actions from './Actions';
import Language from './Language';

interface Definitions {
    i18n: {
        show?: boolean,
        language?: Language
    }
}

const i18n = Toolkit.createReducer(null as Definitions["i18n"] | null, {
    [Actions.setLanguage.type]: (state, action) => ({
        ...state,
        language: action.payload
    }),
    [Actions.showLanguages.type]: (state) => ({
        ...state,
        show: true
    }),
    [Actions.hideLanguages.type]: (state) => ({
        ...state,
        show: false
    })
});

const dictionary = Toolkit.createReducer(null as string[] | null, {
    [Actions.setDictionary.type]: (state, action) => action.payload
});

const error = Toolkit.createReducer(null as Error | null, {
    [Actions.setError.type]: (state, action) => action.payload
});

const reducers = {
    i18n,
    dictionary,
    error
};

export default Redux.combineReducers(reducers);