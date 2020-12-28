import errorSlice, { initialState } from './errorSlice';

const setError = errorSlice.actions.setError;

describe('errorSlice', () => {
    describe('action creators', () => {
        it('should create an action to set the current error', () => {
            const action = {
                type: setError.type,
                payload: null
            };
            expect(setError(null)).toEqual(action);
        });
    });
    describe('reducers', () => {
        it('returns initial state', () => {
            const action = {
                type: ''
            };
            const nextState = errorSlice.reducer(undefined, action);
            expect(nextState).toBe(initialState);
        });
        it('setError', () => {
            const error = new Error('Test');
            const nextState = errorSlice.reducer(initialState, setError(error));
            expect(nextState).toBe(error);
        });
    });
});
