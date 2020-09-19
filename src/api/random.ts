const QUOTA = 16384;

function entropy(size: number): number[] {
    const output = new Uint32Array(size);

    crypto.getRandomValues(output);

    return Array.from(output);
}

export function getRandom(size: number): number[] {
    if (size === 0) return [];

    const data: number[][] = [];

    const quotient = Math.floor(size / QUOTA);
    const remainder = size % QUOTA;

    for (let index = 0; index < quotient; index++) data.push(entropy(QUOTA));
    if (quotient === 0 || remainder > 0) data.push(entropy(remainder));

    const output = data.flat();

    return output;
}

export function selectRandom <T extends any> (count: number, collection: readonly T[]): T[] {
    const output = Array<T>();
    const values = getRandom(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * collection.length);
        const item = collection[position];

        output.push(item);
    }
    
    console.assert(output.length === count);

    return output;
}