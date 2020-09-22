import * as Utilities from './utility';

interface Message {
    type: 'get' | 'string' | 'words'
    payload?: any
}

export const getRandomNumbers = async (count: number) => {
    return new Promise<number[]>(resolve => {
        const worker = new Worker(Utilities.getPublicPath('random.worker.js'));
        const message: Message = {
            type: 'get',
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