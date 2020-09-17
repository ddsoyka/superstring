function entropy(size: number): Uint32Array {
    const output = new Uint32Array(size);

    crypto.getRandomValues(output);

    return output
}

function selectRandom <T extends any> (count: number, collection: readonly T[]): T[] {
    const output = Array<T>();
    const values = entropy(count);

    for (let index = 0; index < count; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * (collection.length + 1));

        output.push(collection[position]);
    }

    return output;
}

export function selectCharacters(length: number, characters: string): string {
    let output = "";
    const values = entropy(length)

    for (let index = 0; index < length; index++) {
        const number = values[index] / (0xffffffff + 1);
        const position = Math.floor(number * (characters.length + 1));

        output += characters.charAt(position);
    }

    return output;
}

export function selectWords(count: number, dictionary: readonly string[], separator: string = ""): string {
    let output = "";
    const words = selectRandom(count, dictionary);

    for (let index = 0; index < words.length; index++) {
        output += words[index];
        if (index < words.length - 1)
            output += separator;
    }

    return output;
}