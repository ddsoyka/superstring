import * as Toolkit from '@reduxjs/toolkit';

interface FileState {
    show: 'none' | 'upload' | 'download'
    download: {
        type: string | undefined
        data: string | undefined
        hash: string | undefined
    }
    upload: FileList | null
}

interface Downloadable {
    type: string
    data: string
    hash: string
}

const initialFileState: FileState = {
    show: 'none',
    download: {
        type: undefined,
        data: undefined,
        hash: undefined
    },
    upload: null
}

const file = Toolkit.createSlice({
    name: 'file',
    initialState: initialFileState,
    reducers: {
        showDownload(state, action: Toolkit.PayloadAction<Downloadable>) {
            state.show = 'download';
            state.download = {
                type: action.payload.type,
                data: action.payload.data,
                hash: action.payload.hash
            }
        },
        hideDownload(state) {
            state.show = 'none';
            state.download = {
                type: undefined,
                data: undefined,
                hash: undefined
            }
        }
    }
});

export default file;