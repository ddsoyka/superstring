import {
    combineReducers,
    Action
}
from 'redux';
import {
    Actions,
    SetLanguageAction,
    SetDictionaryAction
}
from './Actions';
import Language from './Language';

interface Visibility {
    select_language: boolean
}

const language = (state: Language | null = null, action: SetLanguageAction) => {
    switch (action.type) {
        case Actions.SET_LANGUAGE:
            return action.language;
        default:
            return state;
    }
};

const visibility = (state: Visibility | null = null, action: Action) => {
    switch (action.type) {
        case Actions.SHOW_LANGUAGES:
            return {
                ...state,
                select_language: true
            };
        case Actions.HIDE_LANGUAGES:
            return {
                ...state,
                select_language: false
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
}

const reducers = {
    language,
    visibility,
    dictionary
};

export default combineReducers(reducers);