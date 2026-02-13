import { AFFINE_CODE_TOOLBAR_WIDGET, AffineCodeToolbarWidget } from './code-toolbar';
import { AffineCodeToolbar } from './code-toolbar/components/code-toolbar';
import { LanguageListButton } from './code-toolbar/components/lang-button';
import { PreviewButton } from './code-toolbar/components/preview-button';
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        'language-list-button': LanguageListButton;
        'affine-code-toolbar': AffineCodeToolbar;
        'preview-button': PreviewButton;
        [AFFINE_CODE_TOOLBAR_WIDGET]: AffineCodeToolbarWidget;
    }
}
//# sourceMappingURL=effects.d.ts.map