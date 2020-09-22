import * as Utility from './utility';

export const fetchLocalFile = async (file: string) => {
    const url = Utility.getPublicPath(file);
    const response = await fetch(url);

    if (!response.ok) throw Error(`Failed to fetch file from ${response.url}`);

    return await response.blob();
};
