import JSZip from 'jszip';

export const extract = async (input: any, filter?: string) => {
    const archive = await JSZip.loadAsync(input);
    const files = filter ? archive.filter(path => path.includes(filter)) : archive.filter(() => true);

    return Promise.all(files.map(async value => await value.async('blob')));
};