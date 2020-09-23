const QUOTA = 16384;

const entropy = (size) => {
    const output = new Uint32Array(size);

    crypto.getRandomValues(output);

    return Array.from(output);
};

const getRandomNumbers = (size) => {
    if (size === 0) return [];

    const data = [];

    const quotient = Math.floor(size / QUOTA);
    const remainder = size % QUOTA;

    for (let index = 0; index < quotient; index++) data.push(entropy(QUOTA));
    if (quotient === 0 || remainder > 0) data.push(entropy(remainder));

    const output = data.flat();

    return output;
};

const getRandomString = (count, characters) => {
    let output = '';

    const values = getRandomNumbers(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * characters.length);
        const character = characters.charAt(position);
        
        output += character;
    }

    console.assert(output.length === count);

    return output;
};

const getRandomWords = (count, dictionary, separator) => {
    let output = [];

    const values = getRandomNumbers(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * dictionary.length);
        const word = dictionary[position];
        
        output.push(word);
    }

    console.assert(output.length === count);

    return output.join(separator);
};

onmessage = (event) => {
    const {type, payload} = event.data;

    switch (type) {
        case 'get':
            const values = getRandomNumbers(payload);
            postMessage(values);
            break;
        case 'string':
            const text = getRandomString(payload.count, payload.characters);
            postMessage(text);
            break;
        case 'words':
            const words = getRandomWords(payload.count, payload.dictionary, payload.separator);
            postMessage(words);
            break;
        default:
            throw Error(`Unknown task type '${type}'`);
    }
};