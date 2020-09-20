import * as Logger from 'redux-logger';
import * as Toolkit from '@reduxjs/toolkit';
import Language from '../api/Language';
import * as Thunk from './thunk';

const i18n = Toolkit.createSlice({
    name: 'i18n',
    initialState: {
        show: false,
        language: null as Language | null
    },
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
        },
        showLanguages(state) {
            state.show = true
        },
        hideLanguages(state) {
            state.show = false
        }
    }
});

const random = Toolkit.createSlice({
    name: 'random',
    initialState: {
        dictionary: null as string[] | null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [Thunk.loadDictionary.fulfilled.type]: (state, action) => {
            state.dictionary = action.payload;
            state.isLoading = false;
        },
        [Thunk.loadDictionary.pending.type]: state => {
            state.isLoading = true;
        },
        [Thunk.loadDictionary.rejected.type]: state => {
            state.isLoading = false;
        },
        [Thunk.createRandomString.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [Thunk.createRandomString.pending.type]: state => {
            state.isLoading = true;
        },
        [Thunk.createRandomString.rejected.type]: state => {
            state.isLoading = false;
        }
    }
});

const error = Toolkit.createSlice({
    name: 'error',
    initialState: null as Error | null,
    reducers: {
        setError(state, action) {
            state = action.payload
        }
    },
    extraReducers: {
        [Thunk.loadDictionary.rejected.type]: (state, action) => {
            state = action.error
        },
        [Thunk.createRandomString.rejected.type]: (state, action) => {
            state = action.error
        }
    }
});

export const { setLanguage, showLanguages, hideLanguages } = i18n.actions;
export const { setError } = error.actions;

export const Store = Toolkit.configureStore({
    reducer: {
        i18n: i18n.reducer,
        random: random.reducer,
        error: error.reducer
    },
    middleware: getDefaultMiddleware => {
        const middleware = getDefaultMiddleware()

        if (process.env.NODE_ENV === `development`) {
            const logger = Logger.createLogger({
                collapsed: true,
                duration: true
            });
        
            middleware.push(logger);
        }

        return middleware;
    }
})

export type RootState = ReturnType<typeof Store.getState>;

