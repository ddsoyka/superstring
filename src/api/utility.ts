import * as Toolkit from '@reduxjs/toolkit';

type GenericAsyncThunk = Toolkit.AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getPublicPath = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const base64ToBlob = async (input: string) => {
    const response = await fetch(input);
    const blob = await response.blob();

    return blob;
};

export const base64LengthInBytes = (input: string) => (3 * (input.length / 4)) - (input.match(/=/g)?.length ?? 0);

/**
 * Turns a size in bytes into a human-readable string.
 *
 * @param size A quantity of bytes.
 */
export const humanize = (size?: number): string => {
    if (!size || size === 0) return '0 B';
    const exponent = Math.floor(Math.log(size) / Math.log(1024));
    return `${exponent === 0 ? size : (size / Math.pow(1024, exponent)).toFixed(2)} ${['B', 'KB', 'MB', 'GB', 'TB'][exponent]}`;
};

/**
 * Executes a function asynchronously.
 *
 * @param fn The function to execute.
 */
export const async = <T>(fn: () => T): Promise<T> => {
    if (!fn) throw Error('No function was provided');
    return new Promise<T>(
        (resolve, reject) => {
            const executor = () => {
                try {
                    const result = fn();
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            };
            (window.requestAnimationFrame || window.setTimeout)(executor);
        }
    );
};

export const isPendingAction = (action: Toolkit.AnyAction): action is PendingAction => action.type.endsWith('/pending');

export const isRejectedAction = (action: Toolkit.AnyAction): action is RejectedAction => action.type.endsWith('/rejected');

export const isFulfilledAction = (action: Toolkit.AnyAction): action is FulfilledAction => action.type.endsWith('/fulfilled');
