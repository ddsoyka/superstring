import * as Toolkit from '@reduxjs/toolkit';
import JSZip from 'jszip';
import Jimp from 'jimp';
import Language from './Language';
import * as Utility from './utility';

interface Message {
    type: 'get' | 'select'
    payload?: any
}

interface ImageGenerationArgument {
    mime: 'image/png' | 'image/jpeg' | 'image/bmp'
    width: number
    height: number
}

export const loadDictionary = Toolkit.createAsyncThunk(
    'random/loadDictionary',
    async (arg: Language) => {
        const start = performance.now();
        const response = await fetch(Utility.getPublicPath('english.zip'));

        if (!response.ok) throw Error(`Failed to fetch dictionary from ${response.url}`);

        const blob = await response.blob();

        if (blob.type !== 'application/zip') throw Error(`File is not an archive (${blob.type})`);

        const zip = await JSZip.loadAsync(blob);

        const file = zip.file('english.txt');

        if (file === null) throw Error('Corrupt archive');

        const text = await file.async('string');

        const dictionary = text.split('\n');
        const set = new Set(dictionary);
        const sorted = Array.from(set).sort();
        const end = performance.now();

        console.log(`Fetched language pack for ${arg} with ${sorted.length} words in ${end - start}ms`);

        return sorted;
    }
);

export const createRandomString = Toolkit.createAsyncThunk(
    'random/createRandomString',
    (arg: { count: number, separator: string, collection: string[] }) => {
        const start = performance.now();
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));

        return new Promise<string>(resolve => {
            worker.onmessage = event => {
                const data = event.data as string[];
                const output = data.join(arg.separator);
                const end = performance.now();

                console.log(`Generated a random string of ${output.length} characters in ${end - start}ms`)
                
                resolve(output);
            }

            const message: Message = {
                type: 'select',
                payload: {
                    count: arg.count,
                    collection: arg.collection
                }
            };

            worker.postMessage(message);
        });
    }
);

export const createRandomImage = Toolkit.createAsyncThunk(
    'random/createRandomImage',
    async (arg: ImageGenerationArgument) => {
        const start = performance.now();
        const worker = new Worker(Utility.getPublicPath('random.worker.js'));

        return new Promise<string>(resolve => {
            worker.onmessage = async event => {
                const image = await Jimp.create(arg.width, arg.height);
                const data = event.data as number[];

                for (let x = 0; x < arg.width; x++) {
                    for (let y = 0; y < arg.height; y++) {
                        const position = y * arg.width + x;
                        image.setPixelColor(data[position], x, y);
                    }
                }

                const base64 = await image.getBase64Async(arg.mime);
                const end = performance.now();

                console.log(`Generated a random image of ${data.length}B in ${end - start}ms`)

                resolve(base64)
            };

            const message: Message = {
                type: 'get',
                payload: arg.width * arg.height
            };

            worker.postMessage(message);
        });
    }
);