import {
    Action
}
from 'redux';
import {
    ThunkDispatch
}
from 'redux-thunk';
import JSZip from 'jszip';
import Language from './Language';
import {
    setDictionary
}
from './Actions';

export const loadDictionary = (language: Language) => {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        const response = await fetch('/english.zip');
        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);

        const file = zip.file('english.txt');

        if (file === null) throw Error('Corrupt archive');

        const text = await file.async('string');

        const dictionary = text.split('\n');
        const set = new Set(dictionary);
        const sorted = Array.from(set).sort();

        console.log(`Fetched language pack for ${language} with ${sorted.length} words`)

        dispatch(setDictionary(sorted));
    };
}