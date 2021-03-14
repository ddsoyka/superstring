export type TypedArray = Uint8Array | Uint32Array;

export enum DataType {
    Uint8,
    Uint32
}

export interface GetRandomMessage {
    size: number;
}

export interface GetRandomValuesMessage extends GetRandomMessage {
    type: DataType;
}

export interface GetRandomStringMessage extends GetRandomMessage {
    characters: string;
}

export interface GetRandomWordsMessage extends GetRandomMessage {
    dictionary: string[],
    separator: string
}
