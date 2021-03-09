import { render, getRandomUint32, getRandomString, getRandomWords } from './worker';

describe('worker', () => {
    describe('random', () => {
        describe('numbers', () => {
            it('can generate 1000 values', async () => {
                const values = await getRandomUint32(1000);
                expect(values.length).toBe(1000);
            });
            it('can generate 1000000 values', async () => {
                const values = await getRandomUint32(1000000);
                expect(values.length).toBe(1000000);
            });
            it('returns an empty array', async () => {
                const values = await getRandomUint32(0);
                expect(values.length).toBe(0);
            });
            it('throws on negative argument', async () => {
                await expect(getRandomUint32(-1)).rejects.toThrow();
            });
        });
        describe('string', () => {
            const characters = '0123456789';
    
            it('can generate 1000 characters', async () => {
                const string = await getRandomString(1000, characters);
                expect(string).toMatch(/[0-9]{1000}/);
            });
            it('returns an empty string', async () => {
                const string = await getRandomString(0, '');
                expect(string.length).toBe(0);
            });
            it('throws on negative argument', async () => {
                await expect(getRandomString(-1, characters)).rejects.toThrow();
            });
        });
        describe('words', () => {
            const dictionary = ['ab', 'ac', 'ba', 'bc', 'ca', 'cb'];
    
            it('can generate 1000 words', async () => {
                const string = await getRandomWords(1000, dictionary, '-');
                expect(string).toMatch(/([abc]-?){2000}/);
            });
            it('returns an empty string', async () => {
                const string = await getRandomWords(0, [], "");
                expect(string.length).toBe(0);
            });
            it('throws on negative argument', async () => {
                await expect(getRandomWords(-1, dictionary, "")).rejects.toThrow();
            });
        });
    });
    describe('rendering', () => {
        const defaults = {
            data: [1, 255, 214],
            mime: 'image/png',
            grayscale: false
        };
        it('throws when passed an empty data buffer', async () => {
            const data = [] as number[];
            await expect(render(data, defaults.mime, defaults.grayscale)).rejects.toThrow();
        });
        it('throws when passed an invalid MIME type', async () => {
            const mime = 'invalid';
            await expect(render(defaults.data, mime, defaults.grayscale)).rejects.toThrow();
        });
    });
});
