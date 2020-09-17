import {
    Action
}
from 'redux';
import {
    ThunkDispatch
}
from 'redux-thunk';
import {
    setDictionary,
    showError
}
from './Actions';
import JSZip from 'jszip';
import Language from './Language';

export const loadDictionary = (language: Language) => {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        try {
            const response = await fetch(`${process.env.PUBLIC_URL}/english.zip`);

            if (!response.ok) throw Error(`Failed to fetch dictionary from ${response.url}`)

            const blob = await response.blob();
            
            if (blob.type !== 'application/zip') throw Error(`File is not an archive (${blob.type})`)

            const zip = await JSZip.loadAsync(blob);

            const file = zip.file('english.txt');

            if (file === null) throw Error('Corrupt archive');

            const text = await file.async('string');

            const dictionary = text.split('\n');
            const set = new Set(dictionary);
            const sorted = Array.from(set).sort();

            console.log(`Fetched language pack for ${language} with ${sorted.length} words`)

            dispatch(setDictionary(sorted));
        }
        catch (error) {
            dispatch(showError(error))
        }
    };
}