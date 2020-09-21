const QUOTA = 16384;

const entropy = (size) => {
    const output = new Uint32Array(size);

    crypto.getRandomValues(output);

    return Array.from(output);
};

const getRandom = (size) => {
    if (size === 0) return [];

    const data = [];

    const quotient = Math.floor(size / QUOTA);
    const remainder = size % QUOTA;

    for (let index = 0; index < quotient; index++) data.push(entropy(QUOTA));
    if (quotient === 0 || remainder > 0) data.push(entropy(remainder));

    const output = data.flat();

    return output;
};

const selectRandom = (count, collection) => {
    const output = [];
    const values = getRandom(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * collection.length);
        const item = collection[position];

        output.push(item);
    }
    
    console.assert(output.length === count);

    return output;
};

onmessage = (event) => {
    const start = performance.now();
    const {count, separator, collection} = event.data;
    const items = selectRandom(count, collection);
    const output = items.join(separator);
    const end = performance.now();

    console.log(`Generated a random string of ${output.length} characters in ${end - start}ms`)

    postMessage(output);
};