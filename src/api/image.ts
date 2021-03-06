/**
 * Specifies a resolution for an image in pixels.
 */
export class Resolution {
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    readonly width: number;

    readonly height: number;

    // get pixels(): number {
    //     return this.width * this.height
    // };
}

/**
 * Encapsulates data which is required to render an image.
 */
export interface RenderImageMessage {
    data: ArrayLike<number>;
    mime: string;
    grayscale: boolean;
    resolution?: Resolution;
}