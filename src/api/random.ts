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
        const size = width * height * (grayscale ? 1 : 3);
        const message: Message = {
            type: 'uint8',
            payload: size
        };
        worker.onmessage = async event => {
            const start = performance.now();
            const data = event.data;
            const array = new Uint8Array(width * height * 4);

            if (grayscale) {
                for (let i = 0, j = 0; i < size; i++, j += 4) {
                    const colour = data[i];

                    array[j] = colour;
                    array[j + 1] = colour;
                    array[j + 2] = colour;
                    array[j + 3] = 255;
                }
            }
            else {
                for (let i = 0, j = 0; i < size; i += 3, j += 4) {
                    array[j] = data[i];
                    array[j + 1] = data[i + 1];
                    array[j + 2] = data[i + 2];
                    array[j + 3] = 255;
                }
            }

            const raw = {
                width: width,
                height: height,
                data: array
            };
            const image = await Jimp.read(raw as any);
            const base64 = await image.getBase64Async(mime);
            const end = performance.now();

            console.log(`Rendered an image of ${Utility.humanize(size)} in ${end - start}ms`);

            resolve(base64);
        };
        worker.postMessage(message);
    })
};
