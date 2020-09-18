function entropy(size: number): Uint32Array {
    const output = new Uint32Array(size);

    crypto.getRandomValues(output);

    return output;
}

export function selectRandom <T extends any> (count: number, collection: readonly T[]): T[] {
    const output = Array<T>();
    const values = entropy(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * collection.length);
        const item = collection[position];

        output.push(item);
    }
    
    console.assert(output.length === count);

    return output;
}