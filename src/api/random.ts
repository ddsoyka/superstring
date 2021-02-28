import { debug, async } from './utility';

enum DataType {
    Uint8,
    Uint32
}

type RandomValueArray = Uint8Array | Uint32Array;

// The amount of entropy requested in a single operation cannot exceed this value.
const QUOTA = 2 ** 14;

const getRandom = (
    size: number,
    type: DataType
): Promise<number[]> => async(
    () => {
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
    }
);

/**
 * Returns a list of random 8-bit numbers.
 * 
 * @param size The number of values to return.
 */
export
const getRandomUint8 = async (size: number): Promise<number[]> => await getRandom(size, DataType.Uint8);

/**
 * Returns a list of random 32-bit numbers.
 * 
 * @param size The number of values to return.
 */
export
const getRandomUint32 = async (size: number): Promise<number[]> => await getRandom(size, DataType.Uint32);

/**
 * Returns a random string.
 * 
 * @param size The number of characters to output.
 * @param characters A string containing the characters to use.
 */
export
const getRandomString = (
    size: number,
    characters: string
): Promise<string> => async(
    async () => {
        // Perform sanity checks.
        if (size < 0) throw Error('Argument must not be negative');
        if (size === 0 || !characters.length) return '';

        // Get entropy.
        const values = await getRandomUint32(size);

        const array = [];

        const start = performance.now();

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
    }
);

/**
 * Picks random words from a dictionary and returns them as a string.
 * 
 * @param size The number of words to pick.
 * @param dictionary A dictionary containing words.
 * @param separator How to separate words from each other.
 */
export
const getRandomWords = (
    size: number,
    dictionary: string[],
    separator: string
): Promise<string> => async(
    async () => {
        // Perform sanity checks.
        if (size < 0) throw Error('Argument must not be negative');
        if (size === 0 || !dictionary.length) return '';

        // Get entropy.
        const values = await getRandom(size, DataType.Uint32);
        
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
    }
);
