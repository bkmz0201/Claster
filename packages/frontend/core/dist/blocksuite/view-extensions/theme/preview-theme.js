import { AppThemeService } from '@affine/core/modules/theme';
import { ColorScheme } from '@blocksuite/affine/model';
import { ThemeExtensionIdentifier, } from '@blocksuite/affine/shared/services';
import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { LifeCycleWatcher, StdIdentifier, } from '@blocksuite/affine/std';
export function getPreviewThemeExtension(framework) {
    class AffinePagePreviewThemeExtension extends LifeCycleWatcher {
        static { this.key = 'affine-page-preview-theme'; }
        static setup(di) {
            super.setup(di);
            di.override(ThemeExtensionIdentifier, AffinePagePreviewThemeExtension, [
                StdIdentifier,
            ]);
        }
        constructor(std) {
            super(std);
            this.disposables = [];
            const theme$ = framework
                .get(AppThemeService)
                .appTheme.theme$.map(theme => {
                return theme === ColorScheme.Dark
                    ? ColorScheme.Dark
                    : ColorScheme.Light;
            });
            const { signal, cleanup } = createSignalFromObservable(theme$, ColorScheme.Light);
            this.theme = signal;
            this.disposables.push(cleanup);
        }
        getAppTheme() {
            return this.theme;
        }
        getEdgelessTheme() {
            return this.theme;
        }
        unmounted() {
            this.dispose();
        }
        dispose() {
            this.disposables.forEach(dispose => dispose());
        }
    }
    return AffinePagePreviewThemeExtension;
}
//# sourceMappingURL=preview-theme.js.map