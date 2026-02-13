import { type To } from 'history';
import { type MouseEvent } from 'react';
export type WorkbenchLinkProps = React.PropsWithChildren<{
    to: To;
    onClick?: (e: MouseEvent) => void;
    replaceHistory?: boolean;
} & React.HTMLProps<HTMLAnchorElement>>;
export declare const WorkbenchLink: import("react").ForwardRefExoticComponent<Omit<WorkbenchLinkProps, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=workbench-link.d.ts.map