import JSZip from 'jszip';
import MD5 from 'md5';

interface InputFile {
    name: string
    data: any
}

export const extract = async (input: any, filter?: string) => {
    const archive = await JSZip.loadAsync(input);
    const files = filter ? archive.filter(path => path.includes(filter)) : archive.filter(() => true);

    return Promise.all(files.map(async value => await value.async('blob')));
};

export const compress = async (input: InputFile) => {
    const archive = new JSZip();

    archive.file(input.name, input.data); 

    const base64 = await archive.generateAsync({
        compression: 'DEFLATE',
        type: 'base64'
    });

    return `data:application/zip;base64,${base64}`;
};

export const hash = <T extends string | Buffer | number[]> (message: T, options?: MD5.Options) => {
    return new Promise<string>(resolve => resolve(MD5(message, options)));
};