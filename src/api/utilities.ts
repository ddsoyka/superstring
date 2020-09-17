export const unique = (value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index;
};