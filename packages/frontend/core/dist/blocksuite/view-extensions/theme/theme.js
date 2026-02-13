import { DocService, DocsService } from '@affine/core/modules/doc';
import { AppThemeService } from '@affine/core/modules/theme';
import { ColorScheme } from '@blocksuite/affine/model';
import { ThemeExtensionIdentifier, } from '@blocksuite/affine/shared/services';
import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { LifeCycleWatcher, StdIdentifier } from '@blocksuite/affine/std';
import {} from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export function getThemeExtension(framework) {
    class AffineThemeExtension extends LifeCycleWatcher {
        constructor() {
            super(...arguments);
            this.themes = new Map();
            this.disposables = [];
        }
        static { this.key = 'affine-theme'; }
        static setup(di) {
            super.setup(di);
            di.override(ThemeExtensionIdentifier, AffineThemeExtension, [
                StdIdentifier,
            ]);
        }
        getAppTheme() {
            const keyName = 'app-theme';
            const cache = this.themes.get(keyName);
            if (cache)
                return cache;
            const theme$ = framework
                .get(AppThemeService)
                .appTheme.theme$.map(theme => {
                return theme === ColorScheme.Dark
                    ? ColorScheme.Dark
                    : ColorScheme.Light;
            });
            const { signal: themeSignal, cleanup } = createSignalFromObservable(theme$, ColorScheme.Light);
            this.disposables.push(cleanup);
            this.themes.set(keyName, themeSignal);
            return themeSignal;
        }
        getEdgelessTheme(docId) {
            const doc = (docId && framework.get(DocsService).list.doc$(docId).getValue()) ||
                framework.get(DocService).doc;
            const cache = this.themes.get(doc.id);
            if (cache)
                return cache;
            const appTheme$ = framework.get(AppThemeService).appTheme.theme$;
            const docTheme$ = doc.properties$.map(props => props.edgelessColorTheme || 'system');
            const theme$ = combineLatest([
                appTheme$,
                docTheme$,
            ]).pipe(map(([appTheme, docTheme]) => {
                const theme = docTheme === 'system' ? appTheme : docTheme;
                return theme === ColorScheme.Dark
                    ? ColorScheme.Dark
                    : ColorScheme.Light;
            }));
            const { signal: themeSignal, cleanup } = createSignalFromObservable(theme$, ColorScheme.Light);
            this.disposables.push(cleanup);
            this.themes.set(doc.id, themeSignal);
            return themeSignal;
        }
        unmounted() {
            this.dispose();
        }
        dispose() {
            this.disposables.forEach(dispose => dispose());
        }
    }
    return AffineThemeExtension;
}
//# sourceMappingURL=theme.js.map