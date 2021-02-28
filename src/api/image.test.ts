import { render, Resolution } from './image';

const defaults = {
    data: [1, 255, 214],
    mime: 'image/png',
    grayscale: false
};


describe('rendering', () => {
    it('throws when passed an empty data buffer', async () => {
        const data = [] as number[];
        await expect(render(data, defaults.mime, defaults.grayscale)).rejects.toThrow();
    });
    it('throws when passed an invalid MIME type', async () => {
        const mime = 'invalid';
        await expect(render(defaults.data, mime, defaults.grayscale)).rejects.toThrow();
    });
});