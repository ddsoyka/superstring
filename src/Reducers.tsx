import * as Redux from 'redux';
import * as Actions from './Actions';
import Language from './Language';

interface Definitions {
    i18n: {
        show?: boolean,
        language?: Language
    }
    // upload: {
    //     show?: boolean
    //     files?: FileList
    // }
}

const i18n = (state: Definitions["i18n"] | null = null, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.Types.SET_LANGUAGE:
            return {
                ...state,
                language: payload
            };
        case Actions.Types.SHOW_LANGUAGES:
            return {
                ...state,
                show: true
            };
        case Actions.Types.HIDE_LANGUAGES:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
};

const dictionary = (state: Array<string> | null = null, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.Types.SET_DICTIONARY:
            return payload;
        default:
            return state;
    }
};

const error = (state: Error | null = null, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.Types.SET_ERROR:
            return payload;
        default:
            return state;
    }
};

const reducers = {
    i18n,
    dictionary,
    error
};

export default Redux.combineReducers(reducers);