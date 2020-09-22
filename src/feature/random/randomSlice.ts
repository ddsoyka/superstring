import * as Toolkit from '@reduxjs/toolkit';
import Jimp from 'jimp';
import Language from '../../api/Language';
import * as Network from '../../api/network';
import * as Files from '../../api/file';
import * as Random from '../../api/random';
import * as State from '../../app/store';

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

        console.log(`Generated ${data.length} random words in ${end - start}ms`);

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

const randomSlice = Toolkit.createSlice({
    name: 'random',
    initialState: {
        dictionary: null as string[] | null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [loadDictionary.fulfilled.type]: (state, action) => {
            state.dictionary = action.payload;
            state.isLoading = false;
        },
        [loadDictionary.pending.type]: state => {
            state.isLoading = true;
        },
        [loadDictionary.rejected.type]: state => {
            state.isLoading = false;
        },
        [createRandomString.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [createRandomString.pending.type]: state => {
            state.isLoading = true;
        },
        [createRandomString.rejected.type]: state => {
            state.isLoading = false;
        },
        [createRandomWords.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [createRandomWords.pending.type]: state => {
            state.isLoading = true;
        },
        [createRandomWords.rejected.type]: state => {
            state.isLoading = false;
        },
        [createRandomImage.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [createRandomImage.pending.type]: state => {
            state.isLoading = true;
        },
        [createRandomImage.rejected.type]: state => {
            state.isLoading = false;
        }
    }
});

export default randomSlice;