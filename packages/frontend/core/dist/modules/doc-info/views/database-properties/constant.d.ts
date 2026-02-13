import type { I18nString } from '@affine/i18n';
import type { DatabaseCellRendererProps } from '../../types';
export declare const DatabaseRendererTypes: Record<string, {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    Renderer: React.FC<DatabaseCellRendererProps>;
    name: I18nString;
}>;
export declare const isSupportedDatabaseRendererType: (type?: string) => boolean;
//# sourceMappingURL=constant.d.ts.map