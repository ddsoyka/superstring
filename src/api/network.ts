export const fetchLocalFile = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) throw Error(`Failed to fetch file from ${response.url}`);

    return await response.blob();
};
