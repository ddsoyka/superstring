import * as Toolkit from '@reduxjs/toolkit';
import Language from "./Language";

export enum Types {
    SET_LANGUAGE = 'SET_LANGUAGE',
    SET_DICTIONARY = 'SET_DICTIONARY',
    SET_ERROR = 'SET_ERROR',
    SET_FILES = 'SET_FILES',

    SHOW_LANGUAGES = 'SHOW_LANGUAGES',
    HIDE_LANGUAGES = 'HIDE_LANGUAGES',

    SHOW_UPLOAD = 'SHOW_UPLOAD',
    HIDE_UPLOAD = 'HIDE_UPLOAD'
}

export const setLanguage = Toolkit.createAction<Language>(Types.SET_LANGUAGE);
export const showLanguages = Toolkit.createAction(Types.SHOW_LANGUAGES);
export const hideLanguages = Toolkit.createAction(Types.HIDE_LANGUAGES);
export const setDictionary = Toolkit.createAction<string[]>(Types.SET_DICTIONARY);
export const setError = Toolkit.createAction<Error | null>(Types.SET_ERROR);
export const setFiles = Toolkit.createAction<FileList>(Types.SET_FILES);
export const showUpload = Toolkit.createAction(Types.SHOW_UPLOAD);
export const hideUpload = Toolkit.createAction(Types.HIDE_UPLOAD);