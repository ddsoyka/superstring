import * as Toolkit from '@reduxjs/toolkit';
import JSZip from 'jszip';
import Language from '../api/Language';
import * as Utility from '../api/utility';

export const loadDictionary = Toolkit.createAsyncThunk(
    'random/loadDictionary',
    async (arg: Language) => {
        const start = performance.now();
        const response = await fetch(Utility.getPublicPath('english.zip'));

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
        const end = performance.now();

        console.log(`Fetched language pack for ${arg} with ${sorted.length} words in ${end - start}ms`);

        return sorted;
    }
);

export const createRandomString = Toolkit.createAsyncThunk(
    'random/createRandomString',
    (arg: { count: number, separator: string, collection: string[] }) => {
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));

        return new Promise<string>(resolve => {
            worker.onmessage = event => resolve(event.data);
            worker.postMessage(arg);
        });
    }
);