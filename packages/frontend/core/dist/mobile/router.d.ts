export declare const topLevelRoutes: [{
    element: import("react/jsx-runtime").JSX.Element;
    children: ({
        path: string;
        lazy: () => Promise<typeof import("./pages/workspace/index")>;
        loader?: undefined;
    } | {
        path: string;
        loader: ({ params }: import("react-router-dom").LoaderFunctionArgs<any>) => Response;
        lazy?: undefined;
    } | {
        path: string;
        lazy: () => Promise<typeof import("@affine/core/desktop/pages/open-app")>;
        loader?: undefined;
    })[];
}];
export declare const router: import("@remix-run/router").Router;
//# sourceMappingURL=router.d.ts.map