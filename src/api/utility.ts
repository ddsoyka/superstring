export const getPublicPath = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const base64ToBlob = async (input: string) => {
    const response = await fetch(input);
    const blob = await response.blob();

    return blob;
};

export const base64LengthInBytes = (input: string) => (3 * (input.length / 4)) - (input.match(/=/g)?.length ?? 0);
