import { debug } from '../api/utility';
import {
    DataType,
    GetRandomMessage,
    GetRandomValuesMessage,
    GetRandomStringMessage,
    GetRandomWordsMessage
}
from '../api/random';

type RandomValueArray = Uint8Array | Uint32Array;

// The amount of entropy requested in a single operation cannot exceed this value.
const QUOTA = 2 ** 14;

function getRandomValues(size: number, type: DataType): number[] {
    // Perform sanity checks.
    if (size < 0) throw Error('Argument must not be negative');
    if (size === 0) return [];

    const start = performance.now();
    const data = [] as number[];

    // Split the requested output size into a number of chunks.
    const quotient = Math.floor(size / QUOTA);
    const remainder = size % QUOTA;

    let array: RandomValueArray;

    // Create a transfer buffer of the appropriate type.
    switch (type) {
        case DataType.Uint8:
            array = new Uint8Array(QUOTA);
            break;
        case DataType.Uint32:
            array = new Uint32Array(QUOTA);
            break;
        default:
            throw Error('Unrecognized data type');
    }

    // Fill a typed array with data and add it to the output.
    for (let index = 0; index < quotient; index++) {
        crypto.getRandomValues(array);
        array.forEach((value: number) => data.push(value));
    }

    // Add any data that didn't fit into the previous quotas.
    if (quotient === 0 || remainder > 0) {
        crypto.getRandomValues(array);
        array.slice(0, remainder).forEach((value: number) => data.push(value));
    }

    const end = performance.now();

    debug(`Output ${size} numbers in ${end - start}ms`);

    return data;
};

function getRandomString(size: number, characters: string): string {
    // Perform sanity checks.
    if (size < 0) throw Error('Argument must not be negative');
    if (size === 0 || !characters.length) return '';

    // Get entropy.
    const values = getRandomValues(size, DataType.Uint32);

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
    const values = getRandomValues(size, DataType.Uint32);

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