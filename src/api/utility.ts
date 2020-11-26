export const getPublicPath = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const base64ToBlob = async (input: string) => {
    const response = await fetch(input);
    const blob = await response.blob();

    return blob;
};

export const base64LengthInBytes = (input: string) => (3 * (input.length / 4)) - (input.match(/=/g)?.length ?? 0);

export const humanize = (size?: number) => {
    if (!size || size === 0) return '0 B';
    const exponent = Math.floor(Math.log(size) / Math.log(1024));
    return `${exponent === 0 ? size : (size / Math.pow(1024, exponent)).toFixed(2)} ${['B', 'KB', 'MB', 'GB', 'TB'][exponent]}`;
};
