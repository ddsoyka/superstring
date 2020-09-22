import * as Toolkit from '@reduxjs/toolkit';
import Jimp from 'jimp';
import Language from '../../api/Language';
import * as Network from '../../api/network';
import * as Files from '../../api/file';
import * as Random from '../../api/random';
import * as State from '../../app/store';

interface RandomState {
    dictionary: string[] | null,
    loading: 'none' | 'create' | 'save',
}

interface ImageGenerationArgument {
    mime: 'image/png' | 'image/jpeg' | 'image/bmp'
    width: number
    height: number
}

interface StringGenerationArgument {
    count: number
    characters: string
}

interface WordsGenerationArgument {
    count: number
    separator: string
}

const initialRandomState: RandomState = {
    dictionary: null,
    loading: 'none',
}

export const loadDictionary = Toolkit.createAsyncThunk(
    'random/loadDictionary',
    async (arg: Language) => {
        const start = performance.now();

        const archive = await Network.fetchLocalFile('english.zip');

        if (archive.type !== 'application/zip') throw Error(`Expected an archive but got ${archive.type}`);

        const file = await Files.extract(archive, 'english.txt');
        const text = await file[0].text();

        const dictionary = text.split('\n');
        const set = new Set(dictionary);
        const sorted = Array.from(set).sort();

        const end = performance.now();

        console.log(`Fetched dictionary with ${sorted.length} words for ${arg} in ${end - start}ms`);

        return sorted;
    }
);

export const createRandomString = Toolkit.createAsyncThunk(
    'random/createRandomString',
    async (arg: StringGenerationArgument) => {
        const start = performance.now();
        const data = await Random.getRandomString(arg.count, arg.characters);
        const end = performance.now();

        console.log(`Generated a random string of ${data.length} characters in ${end - start}ms`);

        return data;
    }
);

export const createRandomWords: State.AppAsyncThunk<string, WordsGenerationArgument> = Toolkit.createAsyncThunk(
    'random/createRandomWords',
    async (arg, api) => {
        const start = performance.now();
        const state = api.getState();

        if (!state.random.dictionary) throw Error('Missing word list');

        const data = await Random.getRandomWords(arg.count, state.random.dictionary, arg.separator);
        const end = performance.now();

        console.log(`Generated ${arg.count} random words in ${end - start}ms`);

        return data;
    }
);

export const createRandomImage = Toolkit.createAsyncThunk(
    'random/createRandomImage',
    async (arg: ImageGenerationArgument) => {
        const start = performance.now();
        const image = await Jimp.create(arg.width, arg.height);
        const data = await Random.getRandomNumbers(arg.width * arg.height);

        for (let x = 0; x < arg.width; x++) {
            for (let y = 0; y < arg.height; y++) {
                const position = y * arg.width + x;
                image.setPixelColor(data[position], x, y);
            }
        }

        const base64 = await image.getBase64Async(arg.mime);
        const end = performance.now();

        console.log(`Generated a random image of ${data.length}B in ${end - start}ms`)

        return base64;
    }
);

export const saveRandomText: State.AppAsyncThunk<void, string> = Toolkit.createAsyncThunk(
    'random/saveRandomText',
    async (arg, api) => {
        if (arg === '') return;

        const hash = await Files.hash(arg);

        const argument = {
            name: `${hash}.txt`,
            data: arg
        };
        const archive = await Files.compress(argument);
        
        const download = {
            type: 'zip',
            data: archive,
            hash: hash
        };

        api.dispatch(State.showDownload(download));
    }
)

const randomSlice = Toolkit.createSlice({
    name: 'random',
    initialState: initialRandomState,
    reducers: {},
    extraReducers: {
        [loadDictionary.fulfilled.type]: (state, action) => {
            state.dictionary = action.payload;
            state.loading = 'none';
        },
        [loadDictionary.pending.type]: state => {
            state.loading = 'create';
        },
        [loadDictionary.rejected.type]: state => {
            state.loading = 'none';
        },
        [createRandomString.fulfilled.type]: (state) => {
            state.loading = 'none';
        },
        [createRandomString.pending.type]: state => {
            state.loading = 'create';
        },
        [createRandomString.rejected.type]: state => {
            state.loading = 'none';
        },
        [createRandomWords.fulfilled.type]: (state) => {
            state.loading = 'none';
        },
        [createRandomWords.pending.type]: state => {
            state.loading = 'create';
        },
        [createRandomWords.rejected.type]: state => {
            state.loading = 'none';
        },
        [createRandomImage.fulfilled.type]: (state) => {
            state.loading = 'none';
        },
        [createRandomImage.pending.type]: state => {
            state.loading = 'create';
        },
        [createRandomImage.rejected.type]: state => {
            state.loading = 'none';
        },
        [saveRandomText.fulfilled.type]: (state) => {
            state.loading = 'none';
        },
        [saveRandomText.pending.type]: state => {
            state.loading = 'save';
        },
        [saveRandomText.rejected.type]: state => {
            state.loading = 'none';
        }
    }
});

export default randomSlice;