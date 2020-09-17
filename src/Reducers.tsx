import {
    combineReducers,
    Action
}
from 'redux';
import {
    Actions,
    SetLanguageAction,
    SetDictionaryAction,
    ShowErrorAction
}
from './Actions';
import Language from './Language';

interface i18n {
    show?: boolean
    language?: Language
}

const i18n = (state: i18n | null = null, action: Action & SetLanguageAction) => {
    switch (action.type) {
        case Actions.SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            };
        case Actions.SHOW_LANGUAGES:
            return {
                ...state,
                show: true
            };
        case Actions.HIDE_LANGUAGES:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
};

const dictionary = (state: Array<string> | null = null, action: SetDictionaryAction) => {
    switch (action.type) {
        case Actions.SET_DICTIONARY:
            return action.dictionary;
        default:
            return state;
    }
};

const error = (state: Error | null = null, action: Action & ShowErrorAction) => {
    switch (action.type) {
        case Actions.SHOW_ERROR:
            return action.error;
        case Actions.HIDE_ERROR:
            return null;
        default:
            return state;
    }
};

const reducers = {
    i18n,
    dictionary,
    error
};

const root = combineReducers(reducers);

export default root;