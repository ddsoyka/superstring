export const getPublicPath = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const base64ToBlob = async (input: string) => {
    const response = await fetch(input);
    const blob = await response.blob();

    return blob;
};