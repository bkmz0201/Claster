import { LiveData } from '@toeverything/infra';
export declare const createIsland: () => {
    id: string;
    Target: import("react").ForwardRefExoticComponent<Omit<import("react").HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Provider: ({ children }: React.PropsWithChildren) => import("react").ReactPortal | null;
    provided$: LiveData<boolean>;
};
export type Island = ReturnType<typeof createIsland>;
//# sourceMappingURL=island.d.ts.map