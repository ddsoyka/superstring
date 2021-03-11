declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly VERSION: string;
        readonly VERSION_MAJOR: number;
        readonly VERSION_MINOR: number;
        readonly VERSION_PATCH: number;
        readonly VERSION_TWEAK: number;
        readonly VERSION_COMMIT: string;
        readonly VERSION_BRANCH: string;
    }
}