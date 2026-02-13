import { VirtualKeyboardProvider } from '@affine/core/mobile/modules/virtual-keyboard';
import { globalVars } from '@affine/core/mobile/styles/variables.css';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { VirtualKeyboardProvider as BSVirtualKeyboardProvider, } from '@blocksuite/affine/shared/services';
import { LifeCycleWatcher } from '@blocksuite/affine/std';
import { batch, signal } from '@preact/signals-core';
export function KeyboardToolbarExtension(framework) {
    const affineVirtualKeyboardProvider = framework.get(VirtualKeyboardProvider);
    class BSVirtualKeyboardService extends LifeCycleWatcher {
        constructor() {
            super(...arguments);
            this._disposables = new DisposableGroup();
            // eslint-disable-next-line rxjs/finnish
            this.visible$ = signal(false);
            // eslint-disable-next-line rxjs/finnish
            this.height$ = signal(0);
            // eslint-disable-next-line rxjs/finnish
            this.staticHeight$ = signal(0);
            // eslint-disable-next-line rxjs/finnish
            this.appTabSafeArea$ = signal(`calc(${globalVars.appTabSafeArea})`);
        }
        static { this.key = BSVirtualKeyboardProvider.identifierName; }
        static setup(di) {
            super.setup(di);
            di.addImpl(BSVirtualKeyboardProvider, provider => {
                return provider.get(this);
            });
        }
        mounted() {
            this._disposables.add(affineVirtualKeyboardProvider.onChange(({ visible, height }) => {
                batch(() => {
                    if (visible && this.staticHeight$.peek() !== height) {
                        this.staticHeight$.value = height;
                    }
                    this.visible$.value = visible;
                    this.height$.value = height;
                });
            }));
        }
        unmounted() {
            this._disposables.dispose();
        }
    }
    if ('show' in affineVirtualKeyboardProvider) {
        const providerWithAction = affineVirtualKeyboardProvider;
        class BSVirtualKeyboardServiceWithShowAndHide extends BSVirtualKeyboardService {
            show() {
                providerWithAction.show();
            }
            hide() {
                providerWithAction.hide();
            }
        }
        return BSVirtualKeyboardServiceWithShowAndHide;
    }
    return BSVirtualKeyboardService;
}
//# sourceMappingURL=keyboard-toolbar-extension.js.map