import * as Toolkit from '@reduxjs/toolkit';
import Language from '../../api/Language';

const i18nSlice = Toolkit.createSlice({
    name: 'i18n',
    initialState: {
        show: false,
        language: null as Language | null
    },
    reducers: {
        setLanguage(state, action: Toolkit.PayloadAction<Language | null>) {
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

export default i18nSlice;