import { type Island } from '@affine/core/utils/island';
export interface SubPageContextType {
    islands: Island[];
    addIsland: () => {
        island: Island;
        dispose: () => void;
    };
}
export declare const SubPageContext: import("react").Context<SubPageContextType>;
export declare const SubPageTarget: () => import("react/jsx-runtime").JSX.Element[];
export declare const SubPageProvider: ({ island, open, onClose, children, backText, animation, }: {
    island: Island;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    backText?: string;
    animation?: boolean;
}) => import("react/jsx-runtime").JSX.Element | null;
/**
 * Create a new island when the component is mounted,
 * and dispose it when the component is unmounted.
 */
export declare const useSubPageIsland: () => {
    id: string;
    Target: import("react").ForwardRefExoticComponent<Omit<import("react").HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Provider: ({ children }: React.PropsWithChildren) => import("react").ReactPortal | null;
    provided$: import("@toeverything/infra").LiveData<boolean>;
} | null;
//# sourceMappingURL=sub-page.d.ts.map