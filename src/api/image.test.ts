import { render, Resolution } from './image';

const defaults = {
    data: [1, 255, 214],
    mime: 'image/png',
    grayscale: false
};


describe('rendering', () => {
    it('throws when passed an empty data buffer', () => {
        const data = [] as number[];
        expect(render(data, defaults.mime, defaults.grayscale)).rejects.toThrow();
    });
    it('throws when passed an invalid MIME type', () => {
        const mime = 'invalid';
        expect(render(defaults.data, mime, defaults.grayscale)).rejects.toThrow();
    });
});