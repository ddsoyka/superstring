import JSZip from 'jszip';

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