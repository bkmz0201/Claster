import { type WorkbenchLinkProps } from '@affine/core/modules/workbench';
import type { DocMeta } from '@blocksuite/affine/store';
import { type ReactNode } from 'react';
export declare const calcRowsById: (id: string, min?: number, max?: number) => number;
export interface DocCardProps extends Omit<WorkbenchLinkProps, 'to'> {
    meta: {
        id: DocMeta['id'];
        title?: ReactNode;
    } & {
        [key: string]: any;
    };
    showTags?: boolean;
    /**
     * When enabled, preview's height will be calculated based on `meta.id`
     */
    autoHeightById?: boolean;
}
export declare const DocCard: import("react").ForwardRefExoticComponent<Omit<DocCardProps, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=index.d.ts.map