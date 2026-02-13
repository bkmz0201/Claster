import { ColorScheme } from '@blocksuite/affine/model';
import { createSignalFromObservable } from '@blocksuite/affine-shared/utils';
import { Entity, LiveData } from '@toeverything/infra';
export class AppTheme extends Entity {
    constructor() {
        super();
        this.theme$ = new LiveData(undefined);
        const { signal, cleanup } = createSignalFromObservable(this.theme$.map(theme => theme === 'dark' ? ColorScheme.Dark : ColorScheme.Light), ColorScheme.Light);
        this.themeSignal = signal;
        this.disposables.push(cleanup);
    }
}
//# sourceMappingURL=theme.js.map