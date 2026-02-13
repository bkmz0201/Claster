export interface RouteParamsTypes {
    admin: {
        settings: {
            module: {
                module: string;
            };
        };
    };
}
export declare const ROUTES: {
    index: string;
    admin: {
        index: string;
        auth: string;
        setup: string;
        accounts: string;
        ai: string;
        settings: {
            index: string;
            module: string;
        };
        about: string;
        notFound: string;
    };
};
export declare const RELATIVE_ROUTES: {
    index: string;
    admin: {
        index: string;
        auth: string;
        setup: string;
        accounts: string;
        ai: string;
        settings: {
            index: string;
            module: string;
        };
        about: string;
        notFound: string;
    };
};
export declare const FACTORIES: {
    admin: {
        (): string;
        auth(): string;
        setup(): string;
        accounts(): string;
        ai(): string;
        settings: {
            (): string;
            module(params: {
                module: string;
            }): string;
        };
        about(): string;
        notFound(): string;
    };
    home: () => string;
};
//# sourceMappingURL=routes.d.ts.map