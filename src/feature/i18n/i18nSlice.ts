import * as Toolkit from '@reduxjs/toolkit';
import Languages from '../../api/Languages';

interface i18nState {
    show: boolean;
    language: Languages | null,
}

const initiali18nState: i18nState = {
    show: false,
    language: null
};

const i18nSlice = Toolkit.createSlice({
    name: 'i18n',
    initialState: initiali18nState,
    reducers: {
        setLanguage: (state, action: Toolkit.PayloadAction<Languages | null>) => {
            state.language = action.payload;
        },
        showLanguages: state => {
            state.show = true;
        },
        hideLanguages: state => {
            state.show = false;
        }
    }
});

export const { setLanguage, showLanguages, hideLanguages } = i18nSlice.actions;

export default i18nSlice;
