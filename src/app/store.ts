import * as Logger from 'redux-logger';
import * as Toolkit from '@reduxjs/toolkit';
import * as Thunk from 'redux-thunk'
import i18nSlice from '../feature/i18n/i18nSlice';
import randomSlice from '../feature/random/randomSlice';
import errorSlice from '../feature/error/errorSlice';
import fileSlice from '../feature/file/fileSlice';

const store = Toolkit.configureStore({
    reducer: {
        i18n: i18nSlice.reducer,
        random: randomSlice.reducer,
        error: errorSlice.reducer,
        file: fileSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        const middleware = getDefaultMiddleware();

        if (process.env.NODE_ENV === `development`) {
            const logger = Logger.createLogger({
                collapsed: true,
                duration: true
            });
        
            middleware.push(logger);
        }

        return middleware;
    }
});

export const { setLanguage, showLanguages, hideLanguages } = i18nSlice.actions;
export const { setError } = errorSlice.actions;
export const { showDownload, hideDownload } = fileSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = Thunk.ThunkAction<void, RootState, null, Toolkit.Action<string>>;

export default store;