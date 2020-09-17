import {
    Action
}
from "redux";
import Language from "./Language";

export interface SetLanguageAction extends Action {
    language: Language
}

export interface SetDictionaryAction extends Action {
    dictionary: Array<string>
}

export interface ShowErrorAction extends Action {
    error: Error
}

export enum Actions {
    SET_LANGUAGE = 'Set Language',

    SHOW_LANGUAGES = 'Show Languages',
    HIDE_LANGUAGES = 'Hide Languages',

    SET_DICTIONARY = 'Set Dictionary',

    SHOW_ERROR = 'Show Error',
    HIDE_ERROR = 'Hide Error'
}

export const setLanguage = (value: Language): SetLanguageAction => {
    return {
        type: Actions.SET_LANGUAGE,
        language: value
    };
};

export const showLanguages = (): Action => {
    return {
        type: Actions.SHOW_LANGUAGES
    };
};

export const hideLanguages = (): Action => {
    return {
        type: Actions.HIDE_LANGUAGES
    };
};

export const setDictionary = (value: Array<string>): SetDictionaryAction => {
    return {
        type: Actions.SET_DICTIONARY,
        dictionary: value
    };
};

export const showError = (value: Error): ShowErrorAction => {
    return {
        type: Actions.SHOW_ERROR,
        error: value
    };
};

export const hideError = (): Action => {
    return {
        type: Actions.HIDE_ERROR
    };
};