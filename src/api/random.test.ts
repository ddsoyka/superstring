import * as random from './random';

describe('random', () => {
    describe('numbers', () => {
        it('can generate 1000 values', async () => {
            const values = await random.getRandomNumbers(random.DataType.Uint32, 1000);
            expect(values.length).toBe(1000);
        });
        it('returns an empty array', async () => {
            const values = await random.getRandomNumbers(random.DataType.Uint32, 0);
            expect(values.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomNumbers(random.DataType.Uint32, -1)).rejects.toThrow();
        });
    });
    describe('string', () => {
        const characters = '0123456789';

        it('can generate 1000 characters', async () => {
            const string = await random.getRandomString(1000, characters);
            expect(string.length).toBe(1000);
        });
        it('returns an empty string', async () => {
            const string = await random.getRandomString(0, characters);
            expect(string.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomString(-1, characters)).rejects.toThrow();
        });
        it('throws on empty argument', async () => {
            await expect(random.getRandomString(0, '')).rejects.toThrow();
        });
    });
    describe('words', () => {
        const dictionary = ['ab', 'ac', 'ba', 'bc', 'ca', 'cb'];

        it('can generate 1000 characters', async () => {
            const string = await random.getRandomWords(1000, dictionary);
            expect(string.length).toBe(2000);
        });
        it('can separate words', async () => {
            const string = await random.getRandomWords(1000, dictionary, '-');
            expect(string.length).toBe(2999);
            expect(string).toMatch(/([abc]-?)+/);
        });
        it('returns an empty string', async () => {
            const string = await random.getRandomWords(0, dictionary);
            expect(string.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomWords(-1, dictionary)).rejects.toThrow();
        });
        it('throws on empty argument', async () => {
            await expect(random.getRandomWords(0, [])).rejects.toThrow();
        });
    });
    describe('image', () => {
        it('can generate a PNG image', async () => {
            const base64 = await random.getRandomImage(64, 64, 'image/png', false);
            const expected = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
            const bytes = Uint8Array.from(atob(base64.slice(22, 33)), c => c.charCodeAt(0));
            expect(bytes).not.toEqual(expect.arrayContaining(expected));
        });
        it('throws on an invalid dimension', async () => {
            await expect(random.getRandomImage(0, 0, 'image/png', false)).rejects.toThrow();
        });
        it('throws on invalid mime type', async () => {
            await expect(random.getRandomImage(1, 1, '', false)).rejects.toThrow();
        });
    });
});
