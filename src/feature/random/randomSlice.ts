import * as Toolkit from '@reduxjs/toolkit';
import Languages from '../../api/Languages';
import { IO } from '../../utility';
import * as State from '../../app/store';
import { debug, info, PendingAction, RejectedAction, FulfilledAction } from '../../api/utility';
import { render, getRandomUint8, getRandomString, getRandomWords } from '../../worker';
import { Resolution } from '../../api/image';
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
    data: string | Blob;
}

const initialRandomState: RandomState = {
    dictionary: null,
    loading: 'none',
    retry: true,
};

export const loadDictionary = Toolkit.createAsyncThunk(
    'random/loadDictionary',
    async (arg: Languages) => {
        const start = performance.now();

        let archive: Blob | null = null;

        switch (arg) {
            case Languages.EN_US:
            case Languages.EN_GB:
            case Languages.EN_CA:
                const response = await fetch(english);
                if (!response.ok) throw Error(`Failed to fetch file from ${response.url}`);
                archive = await response.blob();
                break;
            case Languages.UNKNOWN:
                throw Error('Unknown language');
            default:
                throw Error(`Cannot get dictionary for ${arg}`);
        }

        if (!archive.type.includes('application/zip'))
            throw Error(`Expected an archive but got "${archive.type}"`);

        const file = await IO.extract(archive, 'blob', 'english.txt');
        const text = await file[0].text();

        const dictionary = text.split('\n');
        const set = new Set(dictionary);
        const sorted = Array.from(set).sort();

        const end = performance.now();

        info(`Fetched ${sorted.length} words for ${arg} in ${end - start}ms`);

        return sorted;
    }
);

export const createRandomString = Toolkit.createAsyncThunk(
    'random/createRandomString',
    async (arg: StringGenerationArgument) => {
        const start = performance.now();
        const output = await getRandomString(arg.count, arg.characters);
        const end = performance.now();
        info(`Created a random string of ${output.length} characters in ${end - start}ms`);
        return output;
    }
);

export const createRandomWords: State.AppAsyncThunk<string, WordsGenerationArgument> = Toolkit.createAsyncThunk(
    'random/createRandomWords',
    async (arg, api) => {
        const start = performance.now();
        const state = api.getState();
        if (!state.random.dictionary) throw Error('Missing word list');
        const output = await getRandomWords(arg.count, state.random.dictionary, arg.separator);
        const end = performance.now();
        info(`Chose ${arg.count} random words in ${end - start}ms`);
        return output;
    }
);

export const createRandomImage = Toolkit.createAsyncThunk(
    'random/createRandomImage',
    async (arg: ImageGenerationArgument) => {
        const start = performance.now();
        const data = await getRandomUint8(arg.width * arg.height * 3);
        const resolution = new Resolution(arg.width, arg.height);
        const image = await render(data, arg.mime, arg.grayscale, resolution);
        const end = performance.now();
        info(`Created a random image with ${arg.width}x${arg.height} pixels in ${end - start}ms`);
        return image;
    }
);

export const saveRandomData: State.AppAsyncThunk<void, SaveRandomDataArgument> = Toolkit.createAsyncThunk(
    'random/saveRandomData',
    async (arg, api) => {
        const start = performance.now();

        if (arg.type === '') throw Error('Unknown data type');
        if (arg.data === '') throw Error('No data to save');

        let data: Blob;

        // Text data tends to compress well, so generate a ZIP archive from the input data.
        if (arg.type === 'txt') {
            const hash = await IO.hash(arg.data as string);

            const argument = {
                name: `${hash}.${arg.type}`,
                data: arg.data
            };

            data = await IO.compress([argument], 'blob');

            const end = performance.now();

            debug(`Compressed a file in ${end - start}ms`);
        }
        else data = arg.data as Blob;

        // Transform Blob type to Buffer type.
        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const hash = await IO.hash(buffer);

        const download = {
            type: arg.type === 'txt' ? 'zip' : arg.type,
            data: data,
            hash: hash
        };

        const end = performance.now();

        info(`Prepared item ${hash} for download in ${end - start}ms`);

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
            (action): action is PendingAction => /^random\/createRandom.*\/pending$/.test(action.type),
            state => {
                state.loading = 'create';
            }
        );

        builder.addMatcher(
            (action): action is RejectedAction => /^random\/.*\/rejected$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );

        builder.addMatcher(
            (action): action is FulfilledAction => /^random\/.*\/fulfilled$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );
    }
});

export const { setRetry } = randomSlice.actions;

export default randomSlice;
