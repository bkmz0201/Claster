import { type MenuOptions, type PopupTarget } from '@blocksuite/affine-components/context-menu';
import { ShadowlessElement } from '@blocksuite/std';
import type { Middleware } from '@floating-ui/dom';
import type { GroupTrait } from './trait.js';
declare const GroupSetting_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class GroupSetting extends GroupSetting_base {
    static styles: import("lit").CSSResult;
    accessor groupTrait: GroupTrait;
    groups$: import("@preact/signals-core").ReadonlySignal<import("./trait.js").Group<unknown, unknown, Record<string, unknown>>[] | undefined>;
    sortContext: import("../utils/wc-dnd/sort/sort-context.js").SortContext;
    connectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1> | undefined;
    accessor groupContainer: HTMLElement;
}
export declare const selectGroupByProperty: (group: GroupTrait, ops?: {
    onSelect?: (id?: string) => void;
    onClose?: () => void;
    onBack?: () => void;
}) => MenuOptions;
export declare const popSelectGroupByProperty: (target: PopupTarget, group: GroupTrait, ops?: {
    onSelect?: () => void;
    onClose?: () => void;
    onBack?: () => void;
}, middleware?: Array<Middleware | null | undefined | false>) => void;
export declare const popGroupSetting: (target: PopupTarget, group: GroupTrait, onBack: () => void, onClose?: () => void, middleware?: Array<Middleware | null | undefined | false>) => void;
export {};
//# sourceMappingURL=setting.d.ts.map