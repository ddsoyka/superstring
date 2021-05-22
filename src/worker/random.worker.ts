/* eslint no-restricted-globals: 1 */

import { debug, TypedArray } from '../utility';
import {
    DataType,
    GetRandomMessage,
    GetRandomValuesMessage,
    GetRandomStringMessage,
    GetRandomWordsMessage
}
from './random';

// The amount of entropy requested in a single operation cannot exceed this value.
const QUOTA = 2 ** 14;

function getRandomValues<T extends TypedArray>(size: number, type: DataType): T {
    // Perform sanity checks.
    if (size < 0) throw Error('Argument must not be negative');

    const start = performance.now();
    
    let output: T;
    let buffer: T;

    // Create buffer and output arrays of the appropriate type.
    switch (type) {
        case DataType.Uint8:
            if (size === 0) return new Uint8Array(0) as T;
            output = new Uint8Array(size) as T;
            buffer = new Uint8Array(QUOTA) as T;
            break;
        case DataType.Uint32:
            if (size === 0) return new Uint32Array(0) as T;
            output = new Uint32Array(size) as T;
            buffer = new Uint32Array(QUOTA) as T;
            break;
        default:
            throw Error('Unrecognized data type');
    }

    // Split the requested output size into a number of chunks.
    const quotient = Math.floor(size / QUOTA);
    const remainder = size % QUOTA;

    // Fill the output array with the new data.
    for (let index = 0; index < quotient; index++) {
        crypto.getRandomValues(buffer);
        output.set(buffer, QUOTA * index);
    }

    // Add any data that didn't fit into the previous quota iterations.
    if (quotient === 0 || remainder > 0) {
        crypto.getRandomValues(buffer);
        output.set(buffer.slice(0, remainder), size - remainder);
    }

    const end = performance.now();

    debug(`Output ${output.length} numbers in ${end - start}ms`);

    return output;
};

function getRandomString(size: number, characters: string): string {
    // Perform sanity checks.
    if (size < 0) throw Error('Argument must not be negative');
    if (size === 0 || !characters.length) return '';

    // Get entropy.
    const values = getRandomValues<Uint32Array>(size, DataType.Uint32);
    const start = performance.now();
    const array = [];

    // Pick a random character and append it to the output string.
    for (let index = 0; index < size; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * characters.length);
        const character = characters.charAt(position);

        array.push(character);
    }

    const output = array.join("");
    const end = performance.now();

    debug(`Output ${output.length} characters in ${end - start}ms`);

    return output;
};

function getRandomWords(size: number, dictionary: string[], separator: string): string {
    // Perform sanity checks.
    if (size < 0) throw Error('Argument must not be negative');
    if (size === 0 || !dictionary.length) return '';

    // Get entropy.
    const values = getRandomValues<Uint32Array>(size, DataType.Uint32);
    const start = performance.now();
    const array = [];

    // Pick elements from the input list randomly and add them to the output array.
    for (let index = 0; index < size; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * dictionary.length);
        const element = dictionary[position];

        array.push(element);
    }

    const output = array.join(separator);
    const end = performance.now();

    debug(`Output ${output.length} characters in ${end - start}ms`);

    return output;
};

self.onmessage = (event: MessageEvent<GetRandomMessage>) => {
    const message = event.data;
    const size = message.size;
    if ('type' in message) {
        const type = (message as GetRandomValuesMessage).type;
        const data = getRandomValues(size, type);
        postMessage(data);
    }
    else if ('characters' in message) {
        const characters = (message as GetRandomStringMessage).characters;
        const data = getRandomString(size, characters);
        postMessage(data);
    }
    else if ('dictionary' in message && 'separator' in message) {
        const dictionary = (message as GetRandomWordsMessage).dictionary;
        const separator = (message as GetRandomWordsMessage).separator;
        const data = getRandomWords(size, dictionary, separator);
        postMessage(data);
    }
};