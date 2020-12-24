import Jimp from 'jimp/es';
import * as Utility from './utility';

interface Message {
    type: 'uint8' | 'uint32' | 'string' | 'words'
    payload?: any
}

export const getRandomNumbers = async (count: number) => {
    return new Promise<number[]>(resolve => {
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));
        const message: Message = {
            type: 'uint32',
            payload: count
        };

        worker.onmessage = event => resolve(event.data);
        worker.postMessage(message);
    });
};

export const getRandomString = async (count: number, characters: string) => {
    return new Promise<string>(resolve => {
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));
        const message: Message = {
            type: 'string',
            payload: {
                count: count,
                characters: characters
            }
        };

        worker.onmessage = event => resolve(event.data);
        worker.postMessage(message);
    });
};

export const getRandomWords = async (count: number, dictionary: string[], separator: string = '') => {
    return new Promise<string>(resolve => {
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));
        const message: Message = {
            type: 'words',
            payload: {
                count: count,
                dictionary: dictionary,
                separator: separator
            }
        };

        worker.onmessage = event => resolve(event.data);
        worker.postMessage(message);
    });
};

export const getRandomImage = async (width: number, height: number, mime: string, grayscale: boolean) => {
    return new Promise<string>(resolve => {
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));
        const size = width * height * 3;
        const message: Message = {
            type: 'uint8',
            payload: size
        };
        worker.onmessage = async event => {
            const start = performance.now();
            const data = event.data;
            const array = new Uint8Array(width * height * 4);

            for (let i = 0, j = 0; i < size; i += 3, j += 4) {
                array[j] = data[i];
                array[j + 1] = data[i + 1];
                array[j + 2] = data[i + 2];
                array[j + 3] = 255;
            }

            const buffer = Buffer.from(array);
            const raw = {
                data: buffer,
                width: width,
                height: height
            };
            const image = new Jimp(raw);

            if (grayscale) image.grayscale();

            const base64 = await image.getBase64Async(mime);
            const end = performance.now();

            console.log(`Rendered an image of ${Utility.humanize(size)} in ${end - start}ms`);

            resolve(base64);
        };
        worker.postMessage(message);
    })
};
