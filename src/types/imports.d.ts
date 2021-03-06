declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.zip' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import React from 'react'

    export interface SvgrProps extends React.SVGProps<SVGSVGElement> {
        title?: string;
    }

    export interface SvgrComponent extends React.FC<SvgrProps> {}

    const component: SvgrComponent;
    
    export default component;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string; };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string; };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string; };
    export default classes;
}

declare module '*.worker.ts' {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}