import * as random from './random';

describe('characters', () => {
    it('should return only allowed characters', () => {
        const characters = random.selectRandom(1000, "abcdefghijklmnopqrstuvwxyz".split('')).join('');

        expect(characters).toMatch(/[a-z]+/i);
    });
});

describe('words', () => {
    it('should return only words in the dictionary', () => {
        const dictionary = ['one', 'two', 'three'];
        const words = random.selectRandom(3, dictionary);

        expect(dictionary).toContain(words[0]);
        expect(dictionary).toContain(words[1]);
        expect(dictionary).toContain(words[2]);
    })

    it('should return the exact number of words', () => {
        const dictionary = ['aaaa', 'aaab', 'aabb', 'abbb', 'bbbb'];
        const words = random.selectRandom(3, dictionary).join('');

        expect(words.length).toBe(12);
    })
})