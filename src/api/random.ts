import { debug, async } from './utility';

/**
 * Defines primitive data types.
 */
export enum DataType {
    Uint8,
    Uint32
}

type RandomValueArray = Uint8Array | Uint32Array;

// The amount of data requested in a single operation cannot exceed this value.
const QUOTA = 2 ** 14;

/**
 * Returns a list of random numbers.
 * 
 * @param size The number of values to return.
 * @param type The data type of the values.
 */
export
const getRandom = (
    size: number,
    type: DataType
): Promise<number[]> => async(
    () => {
        const start = performance.now();

        // Perform sanity checks.
        if (size < 0) throw Error('Argument must not be negative');
        if (size === 0) return [];
    
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
            const values = Array.from(array);
            data.push(...values);
        }
    
        // Add any data that didn't fit into the previous quotas.
        if (quotient === 0 || remainder > 0) {
            crypto.getRandomValues(array);
            const values = Array.from(array).slice(0, remainder);
            data.push(...values);
        }
    
        const end = performance.now();
    
        debug(`Generated ${size} random numbers in ${end - start}ms`);
    
        return data;
    }
);

/**
 * Returns a list of elements chosen randomly from an input list.
 * 
 * @param count The number of elements to return.
 * @param set An array of input elements.
 */
export
const pickRandom = <T> (
    count: number,
    choices: T[]
): Promise<T[]> => async(
    async () => {
        // Perform sanity checks.
        if (count < 0) throw Error('Argument must not be negative');
        if (!choices.length || count === 0) return [];

        // Get entropy.
        const values = await getRandom(count, DataType.Uint32);
        
        const start = performance.now();
        let output = [];

        // Pick elements from the input list randomly and add them to the output array.
        for (let index = 0; index < count; index++) {
            const number = values[index] / (0xffffffff + 1);
            const position = Math.floor(number * choices.length);
            const element = choices[position];

            output.push(element);
        }

        const end = performance.now();

        debug(`Picked ${count} random elements in ${end - start}ms`);

        return output;
    }
);
