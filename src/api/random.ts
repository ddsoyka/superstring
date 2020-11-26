import Jimp from 'jimp';
import * as Utilities from './utility';

interface Message {
    type: 'uint8' | 'uint32' | 'string' | 'words'
    payload?: any
}

export const getRandomNumbers = async (count: number) => {
    return new Promise<number[]>(resolve => {
        const worker = new Worker(Utilities.getPublicPath('random.worker.js'));
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
        const worker = new Worker(Utilities.getPublicPath('random.worker.js'));
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
        const worker = new Worker(Utilities.getPublicPath('random.worker.js'));
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
        const worker = new Worker(Utilities.getPublicPath('random.worker.js'));
        const size = width * height;
        const message: Message = {
            type: 'uint8',
            payload: grayscale ? size : size * 3
        };
        worker.onmessage = async event => {
            const image = await Jimp.create(width, height);
            const data = event.data;

            if (grayscale) {
                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const position = y * width + x;
                        const colour = data[position];
                        const hex = Jimp.rgbaToInt(colour, colour, colour, 255);

                        image.setPixelColor(hex, x, y);
                    }
                }
            }
            else {
                let i = 0;

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const red = data[i];
                        const green = data[i + 1];
                        const blue = data[i + 2];
                        const hex = Jimp.rgbaToInt(red, green, blue, 255);

                        image.setPixelColor(hex, x, y);
                        i += 3;
                    }
                }
            }

            const base64 = await image.getBase64Async(mime);

            resolve(base64);
        };
        worker.postMessage(message);
    })
};
