import * as Toolkit from '@reduxjs/toolkit';
import * as State from '../../app/store';
import * as Utility from '../../api/utility';
import { IO } from '../../utility';
import { render } from '../../worker';
import { showDownload } from '../file/fileSlice';

interface AnalyzeState {
    loading: 'none' | 'create' | 'save';
}

export interface VisualizeBinaryDataArgument {
    mime: 'image/png' | 'image/jpeg' | 'image/bmp';
    data: ArrayLike<number>;
}

interface SaveAnalysisDataArgument {
    type: string;
    data: Blob;
}

const initialAnalyzeState: AnalyzeState = {
    loading: 'none'
};

export const renderBinaryData = Toolkit.createAsyncThunk(
    'analyze/renderBinaryData',
    async (arg: VisualizeBinaryDataArgument) => await render(arg.data, arg.mime, true)
);

export const saveAnalysisData: State.AppAsyncThunk<void, SaveAnalysisDataArgument> = Toolkit.createAsyncThunk(
    'random/saveRandomData',
    async (arg, api) => {
        const start = performance.now();

        if (arg.type === '') throw Error('Unknown data type');

        // Transform Blob type to Buffer type.
        const arrayBuffer = await arg.data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const hash = await IO.hash(buffer);

        const download = {
            type: arg.type,
            data: arg.data,
            hash: hash
        };

        const end = performance.now();

        Utility.debug(`Prepared item ${hash} for download in ${end - start}ms`);

        api.dispatch(showDownload(download));
    }
);

const analyzeSlice = Toolkit.createSlice({
    name: 'analyze',
    initialState: initialAnalyzeState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            saveAnalysisData.pending,
            state => {
                state.loading = 'save';
            }
        );

        builder.addCase(
            renderBinaryData.pending,
            state => {
                state.loading = 'create';
            }
        );

        builder.addMatcher(
            (action): action is Utility.RejectedAction => /^analyze\/.*\/rejected$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );

        builder.addMatcher(
            (action): action is Utility.FulfilledAction => /^analyze\/.*\/fulfilled$/.test(action.type),
            state => {
                state.loading = 'none';
            }
        );
    }
});

export default analyzeSlice;
