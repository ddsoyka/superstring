declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly PROJECT_VERSION: string;
        readonly PROJECT_VERSION_MAJOR: number;
        readonly PROJECT_VERSION_MINOR: number;
        readonly PROJECT_VERSION_PATCH: number;
        readonly PROJECT_VERSION_TWEAK: number;
        readonly PROJECT_VERSION_HASH: string;
        readonly PROJECT_VERSION_BRANCH: string;
    }
}