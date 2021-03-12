import { Resolution, RenderImageMessage } from './image';
import {
    DataType,
    GetRandomValuesMessage,
    GetRandomStringMessage,
    GetRandomWordsMessage
}
from './random';
import ImageWorker from './image.worker.ts';
import RandomWorker from './random.worker.ts';

export * from './image';
export * from './random';

const image = new ImageWorker();
const random = new RandomWorker();

/**
 * Renders arbitrary binary data as an image.
 * 
 * @param data The raw binary data to render.
 * @param mime The MIME type of the image to create.
 * @param grayscale Toggle grayscale rendering.
 */
export function render(data: ArrayLike<number>, mime: string, grayscale: boolean, resolution?: Resolution): Promise<Blob> {
    const message: RenderImageMessage = {
        data: data,
        mime: mime,
        grayscale: grayscale,
        resolution: resolution
    };
    return new Promise<Blob>(
        (resolve, reject) => {
            image.onerror = event => reject(event.error);
            image.onmessage = event => resolve(event.data);
            image.postMessage(message);
        }
    );
}

/**
* Returns a list of random 8-bit numbers.
* 
* @param size The number of values to return.
*/
export function getRandomUint8(size: number): Promise<number[]> {
    const message: GetRandomValuesMessage = {
        size: size,
        type: DataType.Uint8
    };
    return new Promise<number[]>(
        (resolve, reject) => {
            random.onerror = event => reject(event.error);
            random.onmessage = event => resolve(event.data);
            random.postMessage(message);
        }
    );
}

/**
 * Returns a list of random 32-bit numbers.
 * 
 * @param size The number of values to return.
 */
export function getRandomUint32(size: number): Promise<number[]> {
    const message: GetRandomValuesMessage = {
        size: size,
        type: DataType.Uint32
    };
    return new Promise<number[]>(
        (resolve, reject) => {
            random.onerror = event => reject(event.error);
            random.onmessage = event => resolve(event.data);
            random.postMessage(message);
        }
    );
}

/**
 * Returns a random string.
 * 
 * @param size The number of characters to output.
 * @param characters A string containing the characters to use.
 */
export function getRandomString(size: number, characters: string): Promise<string> {
    const message: GetRandomStringMessage = {
        size: size,
        characters: characters
    };
    return new Promise<string>(
        (resolve, reject) => {
            random.onerror = event => reject(event.error);
            random.onmessage = event => resolve(event.data);
            random.postMessage(message);
        }
    );
}

/**
 * Picks random words from a dictionary and returns them as a string.
 * 
 * @param size The number of words to pick.
 * @param dictionary A dictionary containing words.
 * @param separator How to separate words from each other.
 */
export function getRandomWords(size: number, dictionary: string[], separator: string): Promise<string> {
    const message: GetRandomWordsMessage = {
        size: size,
        dictionary: dictionary,
        separator: separator
    };
    return new Promise<string>(
        (resolve, reject) => {
            random.onerror = event => reject(event.error);
            random.onmessage = event => resolve(event.data);
            random.postMessage(message);
        }
    );
}