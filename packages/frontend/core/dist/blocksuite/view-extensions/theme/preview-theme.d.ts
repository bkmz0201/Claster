import { ColorScheme } from '@blocksuite/affine/model';
import { type Signal } from '@blocksuite/affine/shared/utils';
import { type BlockStdScope } from '@blocksuite/affine/std';
import type { Container } from '@blocksuite/global/di';
import type { FrameworkProvider } from '@toeverything/infra';
export declare function getPreviewThemeExtension(framework: FrameworkProvider): {
    new (std: BlockStdScope): {
        readonly theme: Signal<ColorScheme>;
        readonly disposables: (() => void)[];
        getAppTheme(): Signal<ColorScheme>;
        getEdgelessTheme(): Signal<ColorScheme>;
        unmounted(): void;
        dispose(): void;
        readonly std: BlockStdScope;
        created(): void;
        mounted(): void;
        rendered(): void;
    };
    readonly key: "affine-page-preview-theme";
    setup(di: Container): void;
};
//# sourceMappingURL=preview-theme.d.ts.map