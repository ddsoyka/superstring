import JSZip from 'jszip';
import MD5 from 'md5';

interface InputFile {
    name: string;
    data: any;
}

export const extract = async <T extends JSZip.OutputType>(input: any, output: T, filter?: string) => {
    const archive = await JSZip.loadAsync(input);
    const files = filter ? archive.filter(path => path.includes(filter)) : archive.filter(() => true);

    return Promise.all(files.map(async value => await value.async(output)));
};

export const compress = async <I extends JSZip.InputType, O extends JSZip.OutputType>(input: InputFile[], output: O) => {
    const archive = new JSZip();

    input.forEach(value => archive.file<I>(value.name, value.data));

    return await archive.generateAsync({
        compression: 'DEFLATE',
        type: output
    });
};

export const hash = <T extends string | Buffer | number[]>(message: T, options?: MD5.Options) => {
    return new Promise<string>(resolve => setTimeout(() => resolve(MD5(message, options))));
};
