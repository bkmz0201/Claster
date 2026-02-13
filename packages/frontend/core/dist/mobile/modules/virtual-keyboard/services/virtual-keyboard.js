import { LiveData, Service } from '@toeverything/infra';
import { setElementVars } from '@vanilla-extract/dynamic';
import { globalVars } from '../../../styles/variables.css';
export class VirtualKeyboardService extends Service {
    constructor(virtualKeyboardProvider) {
        super();
        this.virtualKeyboardProvider = virtualKeyboardProvider;
        this.visible$ = new LiveData(false);
        this.height$ = new LiveData(0);
        this.staticHeight = 0;
        this._observe();
    }
    _observe() {
        this.disposables.push(this.virtualKeyboardProvider.onChange(info => {
            this.visible$.next(info.visible);
            this.height$.next(info.height);
            setElementVars(document.body, {
                [globalVars.appKeyboardHeight]: `${this.height$.value}px`,
            });
            if (info.visible && this.staticHeight !== info.height) {
                this.staticHeight = info.height;
                setElementVars(document.body, {
                    [globalVars.appKeyboardStaticHeight]: `${this.staticHeight}px`,
                });
            }
        }));
    }
}
//# sourceMappingURL=virtual-keyboard.js.map