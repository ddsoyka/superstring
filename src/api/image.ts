import Jimp from 'jimp/es';
import * as Utility from './utility';

/**
 * Transforms arbitrary binary data into an image.
 * 
 * @param data The raw binary data to render.
 * @param width The width in pixels of the image.
 * @param height The height in pixels of the image.
 * @param mime The MIME type of the image to create.
 * @param grayscale Toggle grayscale rendering.
 */
export const render = (data: ArrayLike<number>, mime: string, grayscale: boolean) => Utility.async(
    async () => {
        if (data.length < 1) throw Error('Cannot render without input data');
        if (!/image\/(png|jpeg|bmp)/.test(mime)) throw Error('Invalid mime type');

        const start = performance.now();

        // Find the smallest square which fits the input data set.
        const size = data.length;
        const square = Math.sqrt(size);
        const ceiling = Math.ceil(square);
        const width = ceiling, height = ceiling;

        Utility.debug(`Calculated a resolution of ${width}x${height} pixels from ${Utility.humanize(size)}`);

        const array = new Uint8Array(width * height * 4);

        // Transform one byte into a single RGBA pixel.
        for (let i = 0, j = 0; i < size; i++, j += 4) {
            const pixel = data[i];
            array[j] = pixel;
            array[j + 1] = pixel;
            array[j + 2] = pixel;
            array[j + 3] = 255;
        }

        // Pass the rendered image to Jimp.
        const buffer = Buffer.from(array);
        const raw = {
            data: buffer,
            width: width,
            height: height
        };
        const image = new Jimp(raw);

        if (grayscale) image.grayscale();

        // Encode image data as Base64.
        const base64 = await image.getBase64Async(mime);

        const end = performance.now();

        Utility.debug(`Rendered an image of ${Utility.humanize(array.length)} in ${end - start}ms`);

        return base64;
    }
);