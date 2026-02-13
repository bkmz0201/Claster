type CurrentDocCollection = {
    meta: {
        id: string;
        flavour: string;
    };
};
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & {
    workspace: {
        current: () => Promise<{
            meta: {
                id: string;
                flavour: string;
            };
        }>;
    };
} & {
    workspace: {
        current: () => Promise<CurrentDocCollection>;
    };
}, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions>;
export {};
//# sourceMappingURL=mobile.d.ts.map