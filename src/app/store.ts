import * as Logger from 'redux-logger';
import * as Toolkit from '@reduxjs/toolkit';
import i18nSlice from '../feature/i18n/i18nSlice';
import randomSlice from '../feature/random/randomSlice';
import errorSlice from '../feature/error/errorSlice';
import fileSlice from '../feature/file/fileSlice';
import analyzeSlice from '../feature/analyze/analyzeSlice';

interface AsyncThunkConfig {
    dispatch: typeof store.dispatch;
    state: RootState;
}

const store = Toolkit.configureStore({
    reducer: {
        i18n: i18nSlice.reducer,
        random: randomSlice.reducer,
        error: errorSlice.reducer,
        file: fileSlice.reducer,
        analyze: analyzeSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        const middleware = getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        });

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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppAsyncThunk<Returned, Argument> = Toolkit.AsyncThunk<Returned, Argument, AsyncThunkConfig>;

export default store;
