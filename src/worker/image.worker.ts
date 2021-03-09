/* eslint no-restricted-globals: 1 */

import Jimp from 'jimp/es';
import { debug, humanize } from '../api/utility';
import { Resolution, RenderImageMessage } from '../api/image';

function calculate(size: number): Resolution {
    // Each RGBA pixel can fit up to three input data bytes,
    // meaning that only one-third of the input data size is needed.
    size /= 3;

    // Find the smallest square which fits the input data set.
    const square = Math.sqrt(size);
    const ceiling = Math.ceil(square);
    const width = ceiling, height = ceiling;

    debug(`Calculated a resolution of ${width}x${height} pixels from an input size of ${humanize(size)}`);

    return new Resolution(width, height);
};

function transform(resolution: Resolution, data: ArrayLike<number>): Uint8Array {
    const size = data.length;
    // const array = new Uint8Array(resolution.pixels * 4);
    const array = new Uint8Array(resolution.width * resolution.height * 4);

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

async function render(data: ArrayLike<number>, mime: string, grayscale: boolean, resolution?: Resolution): Promise<Blob> {
    const start = performance.now();

    const size = data.length;
    const pixels = (resolution?.width || 0) * (resolution?.height || 0) * 3;

    // Perform safety checks.
    if (size < 1) throw Error('Cannot render without input data');
    if (resolution && (resolution.width < 1 || resolution.height < 1)) throw Error('Resolution is invalid');
    // if (resolution && size !== resolution.pixels * 3) throw Error('Received more or less input data than expected');
    if (resolution && size !== pixels) throw Error('Received more or less input data than expected');
    if (!/image\/(png|jpeg|bmp)/.test(mime)) throw Error('Invalid mime type');

    // If no resolution is provided, then calculate an appropriate resolution instead.
    if (!resolution) resolution = calculate(size);

    // Transform each byte into a single RGBA pixel.
    const array = transform(resolution, data);

    // Pass the rendered image data to Jimp.
    const raw = {
        data: Buffer.from(array),
        width: resolution.width,
        height: resolution.height
    };
    const image = new Jimp(raw);

    // Optionally process the image as grayscale.
    if (grayscale) image.grayscale();

    // Encode image data as Base64.
    const buffer = await image.getBufferAsync(mime);
    const blob = new Blob([buffer]);

    const end = performance.now();

    debug(`Rendered an image in ${end - start}ms`);

    return blob;
};

self.onmessage = async (event: MessageEvent<RenderImageMessage>) => {
    const { data, mime, grayscale, resolution } = event.data;
    const blob = await render(data, mime, grayscale, resolution);
    postMessage(blob);
};