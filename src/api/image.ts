import Jimp from 'jimp/es';
import * as Utility from './utility';

/**
 * Specifies a resolution for an image in pixels.
 */
export class Resolution {
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    readonly width: number;

    readonly height: number;

    get pixels(): number {
        return this.width * this.height
    };
}

const calculate = (size: number): Resolution => {
    // Each RGBA pixel can fit up to three input data bytes,
    // meaning that only one-third of the input data size is needed.
    size /= 3;

    // Find the smallest square which fits the input data set.
    const square = Math.sqrt(size);
    const ceiling = Math.ceil(square);
    const width = ceiling, height = ceiling;

    return new Resolution(width, height);
};

const transform = (resolution: Resolution, data: ArrayLike<number>): Uint8Array => {
    const size = data.length;
    const array = new Uint8Array(resolution.pixels * 4);

    // Fill RGBA pixel array with data.
    let i = 0, j = 0;
    for (; i < size - 3; i += 3, j += 4) {
        array[j] = data[i];
        array[j + 1] = data[i + 1];
        array[j + 2] = data[i + 2];
        array[j + 3] = 255;
    }

    // If there is not enough data to perfectly fill every RGBA pixel,
    // then fill every colour component of the last pixel with the value of the last byte.
    if (size % 3 === 0) {
        array[j] = data[i];
        array[j + 1] = data[i + 1];
        array[j + 2] = data[i + 2];
        array[j + 3] = 255;
    }
    else {
        const colour = data[i]
        array[j] = colour;
        array[j + 1] = colour;
        array[j + 2] = colour;
        array[j + 3] = 255;
    }

    return array;
};

/**
 * Renders arbitrary binary data as an image.
 * 
 * @param data The raw binary data to render.
 * @param mime The MIME type of the image to create.
 * @param grayscale Toggle grayscale rendering.
 */
export
const render = (
    data: ArrayLike<number>,
    mime: string,
    grayscale: boolean,
    resolution?: Resolution
): Promise<string> => Utility.async(
    async () => {
        const start = performance.now();
        const size = data.length;

        // Perform safety checks.
        if (size < 1) throw Error('Cannot render without input data');
        if (resolution && (resolution.width < 1 || resolution.height < 1)) throw Error('Resolution is invalid');
        if (resolution && size !== resolution.pixels * 3) throw Error('Received more or less input data than expected');
        if (!/image\/(png|jpeg|bmp)/.test(mime)) throw Error('Invalid mime type');

        // If no resolution is provided, then calculate an appropriate resolution instead.
        if (!resolution) resolution = calculate(size);

        Utility.debug(`Rendering an image of ${resolution.width}x${resolution.height} pixels from ${Utility.humanize(size)} of input data`);

        // Transform each byte into a single RGBA pixel.
        const array = transform(resolution, data);

        // Pass the rendered image data to Jimp.
        const buffer = Buffer.from(array);
        const raw = {
            data: buffer,
            width: resolution.width,
            height: resolution.height
        };
        const image = new Jimp(raw);

        // Optionally process the image as grayscale.
        if (grayscale) image.grayscale();

        // Encode image data as Base64.
        const base64 = await image.getBase64Async(mime);

        const end = performance.now();

        Utility.debug(`Rendered an image in ${end - start} ms`);

        return base64;
    }
);