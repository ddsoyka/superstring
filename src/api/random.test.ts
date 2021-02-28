import * as random from './random';

describe('random', () => {
    describe('numbers', () => {
        it('can generate 1000 values', async () => {
            const values = await random.getRandomUint32(1000);
            expect(values.length).toBe(1000);
        });
        it('can generate 1000000 values', async () => {
            const values = await random.getRandomUint32(1000000);
            expect(values.length).toBe(1000000);
        });
        it('returns an empty array', async () => {
            const values = await random.getRandomUint32(0);
            expect(values.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomUint32(-1)).rejects.toThrow();
        });
    });
    describe('string', () => {
        const characters = '0123456789';

        it('can generate 1000 characters', async () => {
            const string = await random.getRandomString(1000, characters);
            expect(string).toMatch(/[0-9]{1000}/);
        });
        it('returns an empty string', async () => {
            const string = await random.getRandomString(0, '');
            expect(string.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomString(-1, characters)).rejects.toThrow();
        });
    });
    describe('words', () => {
        const dictionary = ['ab', 'ac', 'ba', 'bc', 'ca', 'cb'];

        it('can generate 1000 words', async () => {
            const string = await random.getRandomWords(1000, dictionary, '-');
            expect(string).toMatch(/([abc]-?){2000}/);
        });
        it('returns an empty string', async () => {
            const string = await random.getRandomWords(0, [], "");
            expect(string.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(random.getRandomWords(-1, dictionary, "")).rejects.toThrow();
        });
    });
});
