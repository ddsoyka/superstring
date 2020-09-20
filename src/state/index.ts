import * as Logger from 'redux-logger';
import * as Toolkit from '@reduxjs/toolkit';
import * as Slice from './slice';

const { i18n, random, error } = Slice;

export const { setLanguage, showLanguages, hideLanguages } = i18n.actions;
export const { setError } = error.actions;

export const Store = Toolkit.configureStore({
    reducer: {
        i18n: i18n.reducer,
        random: random.reducer,
        error: error.reducer
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

export type RootState = ReturnType<typeof Store.getState>;

