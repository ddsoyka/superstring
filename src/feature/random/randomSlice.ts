import * as Toolkit from '@reduxjs/toolkit';
import Language from '../../api/Language';
import * as Network from '../../api/network';
import * as Files from '../../api/file';
import * as Random from '../../api/random';
import * as State from '../../app/store';
import * as Utility from '../../api/utility';
import { showDownload } from '../file/fileSlice';
import english from '../../assets/english.zip';

interface RandomState {
    dictionary: string[] | null,
    loading: 'none' | 'create' | 'save' | 'dictionary',
    retry: boolean,
}

interface ImageGenerationArgument {
    mime: 'image/png' | 'image/jpeg' | 'image/bmp';
    width: number;
    height: number,
    grayscale: boolean;
}

interface StringGenerationArgument {
    count: number;
    characters: string;
}

interface WordsGenerationArgument {
    count: number;
    separator: string;
}

interface SaveRandomDataArgument {
    type: string;
    data: string;
}

const initialRandomState: RandomState = {
    dictionary: null,
    loading: 'none',
    retry: true,
};

export const loadDictionary = Toolkit.createAsyncThunk(
    'random/loadDictionary',
    async (arg: Language) => {
        const start = performance.now();

        let archive: Blob | null = null;

        switch (arg) {
            case Language.EN_US:
            case Language.EN_GB:
            case Language.EN_CA:
                archive = await Network.fetchLocalFile(english);
                break;
            case Language.UNKNOWN:
                throw Error('Unknown language');
            default:
                throw Error(`Cannot get dictionary for ${arg}`);
        }

        if (!archive.type.includes('application/zip'))
            throw Error(`Expected an archive but got "${archive.type}"`);

        const file = await Files.extract(archive, 'blob', 'english.txt');
        const text = await file[0].text();

        const dictionary = text.split('\n');
        const set = new Set(dictionary);
        const sorted = Array.from(set).sort();

        const end = performance.now();

        Utility.debug(`Fetched ${sorted.length} words for ${arg} in ${end - start}ms`);

        return sorted;
    }
);

export const createRandomString = Toolkit.createAsyncThunk(
    'random/createRandomString',
    async (arg: StringGenerationArgument) => await Random.getRandomString(arg.count, arg.characters)
);

export const createRandomWords: State.AppAsyncThunk<string, WordsGenerationArgument> = Toolkit.createAsyncThunk(
    'random/createRandomWords',
    async (arg, api) => {
        const state = api.getState();
        if (!state.random.dictionary) throw Error('Missing word list');
        return await Random.getRandomWords(arg.count, state.random.dictionary, arg.separator);
    }
);

export const createRandomImage = Toolkit.createAsyncThunk(
    'random/createRandomImage',
    async (arg: ImageGenerationArgument) => await Random.getRandomImage(arg.width, arg.height, arg.mime, arg.grayscale)
);

export const saveRandomData: State.AppAsyncThunk<void, SaveRandomDataArgument> = Toolkit.createAsyncThunk(
    'random/saveRandomData',
    async (arg, api) => {
        const start = performance.now();

        if (arg.type === '') throw Error('Unknown data type');
        if (arg.data === '') throw Error('No data to save');

        let data: Blob;

        if (arg.type === 'txt') {
            const hash = await Files.hash(arg.data);

            const argument = {
                name: `${hash}.${arg.type}`,
                data: arg.data
            };

            data = await Files.compress([argument], 'blob');

            const end = performance.now();

            Utility.debug(`Compressed a file in ${end - start}ms`);
        }
        else data = await Utility.base64ToBlob(arg.data);

        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const hash = await Files.hash(buffer);

        const download = {
            type: arg.type === 'txt' ? 'zip' : arg.type,
            data: data,
            hash: hash
        };

        const end = performance.now();

        Utility.debug(`Prepared item ${hash} for download in ${end - start}ms`);

        api.dispatch(showDownload(download));
    }
);

const randomSlice = Toolkit.createSlice({
    name: 'random',
    initialState: initialRandomState,
    reducers: {
        setRetry(state, action) {
            state.retry = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(
            loadDictionary.pending,
            state => {
                state.loading = 'dictionary';
            }
        );

        builder.addCase(
            saveRandomData.pending,
            state => {
                state.loading = 'save';
            }
        );

        builder.addCase(
            loadDictionary.fulfilled,
            (state, action) => {
                state.dictionary = action.payload;
            }
        );

        builder.addMatcher(
            (action): action is Utility.PendingAction => /^random\/createRandom.*\/pending$/.test(action.type),
            state => {
                state.loading = 'create';
            }
        );

        builder.addMatcher(
            (action): action is Utility.RejectedAction => /^random\/.*\/rejected$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );

        builder.addMatcher(
            (action): action is Utility.FulfilledAction => /^random\/.*\/fulfilled$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );
    }
});

export const { setRetry } = randomSlice.actions;

export default randomSlice;
