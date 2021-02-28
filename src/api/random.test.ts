import { getRandom, pickRandom, DataType } from './random';

describe('random', () => {
    describe('get', () => {
        it('can generate 1000 values', async () => {
            const values = await getRandom(1000, DataType.Uint32);
            expect(values.length).toBe(1000);
        });
        it('can generate 1000000 values', async () => {
            const values = await getRandom(1000000, DataType.Uint32);
            expect(values.length).toBe(1000000);
        });
        it('returns an empty array', async () => {
            const values = await getRandom(0, DataType.Uint32);
            expect(values.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(getRandom(-1, DataType.Uint32)).rejects.toThrow();
        });
    });
    describe('pick', () => {
        const dictionary = ['ab', 'ac', 'ba', 'bc', 'ca', 'cb'];

        it('can pick 1000 elements', async () => {
            const array = await pickRandom(1000, dictionary);
            expect(array.length).toBe(1000);
        });
        it('returns an empty value', async () => {
            const result = await pickRandom(0, []);
            expect(result.length).toBe(0);
        });
        it('throws on negative argument', async () => {
            await expect(pickRandom(-1, [])).rejects.toThrow();
        });
    });
});
