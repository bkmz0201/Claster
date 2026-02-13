import type { ReactNode } from 'react';
interface ExportMenuItemProps<T> {
    onSelect: () => void;
    className?: string;
    type: T;
    icon: ReactNode;
    label: string;
}
interface ExportProps {
    exportHandler: (type: 'pdf' | 'html' | 'png' | 'markdown' | 'snapshot' | 'pdf-export') => void;
    pageMode?: 'page' | 'edgeless';
    className?: string;
}
export declare function ExportMenuItem<T>({ onSelect, className, type, icon, label, }: ExportMenuItemProps<T>): import("react/jsx-runtime").JSX.Element;
export declare const PrintMenuItems: ({ exportHandler, className, }: ExportProps) => import("react/jsx-runtime").JSX.Element;
export declare const ExportMenuItems: ({ exportHandler, className, pageMode, }: ExportProps) => import("react/jsx-runtime").JSX.Element;
export declare const Export: ({ exportHandler, className, pageMode }: ExportProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=export.d.ts.map