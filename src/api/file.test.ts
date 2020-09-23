import * as file from './file';

describe('md5', () => {
    it('can hash a string', async () => {
        const input = 'A beautiful day at the beach!';
        const hash = await file.hash(input);

        expect(hash).toBe('6211ace8695c06a274585e64e8727a2c');
    });
});

describe('zip', () => {
    it('can compress and extract a file', async () => {
        const input = {
            name: 'test.txt',
            data: 'A wonderful life.'
        };
        const archive = await file.compress([input], 'array');
        const strings = await file.extract(archive, 'text');
        const output = strings[0];

        expect(output).toBe(input.data);
    });
});