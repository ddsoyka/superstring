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

        it('can generate 1000 words', async () => {
            const string = await random.getRandomWords(1000, dictionary);
            expect(string.length).toBe(2000);
        });
        it('can separate words', async () => {
            const string = await random.getRandomWords(1000, dictionary, '-');
            expect(string).toMatch(/([abc]-?){2000}/);
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
});
