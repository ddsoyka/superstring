import JSZip from 'jszip';
import MD5 from 'md5';

interface InputFile {
    name: string;
    data: any;
}

type InputFileType = string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream | Buffer;

/**
 * Decodes a compressed archive and returns all files or a subset of files.
 * 
 * @param input An input source.
 * @param output The data format to output decompressed data as.
 * @param filter An optional predicate function by which files will be excluded from being included in the output.
 */
export async function extract<T extends JSZip.OutputType>(input: InputFileType, output: T, filter?: string) {
    const archive = await JSZip.loadAsync(input);
    const files = archive.filter(path => filter ? path.includes(filter) : true);
    const promises = files.map(async value => await value.async<T>(output));

    return Promise.all(promises);
};

/**
 * Encodes and compresses input data.
 * 
 * @param input The input data.
 * @param output The data format to output decompressed data as.
 */
export async function compress<I extends JSZip.InputType, O extends JSZip.OutputType>(input: InputFile[], output: O) {
    const archive = new JSZip();

    input.forEach(value => archive.file<I>(value.name, value.data));

    return await archive.generateAsync({
        compression: 'DEFLATE',
        type: output
    });
};

/***
 * Computes the MD5 checksum for a given block of input data.
 */
export async function hash<T extends string | Buffer | number[]>(message: T, options?: MD5.Options): Promise<string> {
    return MD5(message, options);
};

/**
 * Turns a size in bytes into a human-readable string.
 *
 * @param size A quantity of bytes.
 */
export function humanize(size?: number): string {
    if (!size || size === 0) return '0 B';
    const exponent = Math.floor(Math.log(size) / Math.log(1024));
    return `${exponent === 0 ? size : (size / Math.pow(1024, exponent)).toFixed(2)} ${['B', 'KB', 'MB', 'GB', 'TB'][exponent]}`;
};
