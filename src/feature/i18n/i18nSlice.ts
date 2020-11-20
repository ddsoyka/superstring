import * as Toolkit from '@reduxjs/toolkit';
import Language from '../../api/Language';

interface i18nState {
    show: boolean
    language: Language | null,
}

const initiali18nState: i18nState = {
    show: false,
    language: null
}

const i18nSlice = Toolkit.createSlice({
    name: 'i18n',
    initialState: initiali18nState,
    reducers: {
        setLanguage: (state, action: Toolkit.PayloadAction<Language | null>) => {
            state.language = action.payload
        },
        showLanguages: state => {
            state.show = true
        },
        hideLanguages: state => {
            state.show = false
        }
    }
});

export default i18nSlice;