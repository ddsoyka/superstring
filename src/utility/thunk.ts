import { AsyncThunk, AnyAction } from '@reduxjs/toolkit';

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;

export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const isPendingAction = (action: AnyAction): action is PendingAction => action.type.endsWith('/pending');

export const isRejectedAction = (action: AnyAction): action is RejectedAction => action.type.endsWith('/rejected');

export const isFulfilledAction = (action: AnyAction): action is FulfilledAction => action.type.endsWith('/fulfilled');