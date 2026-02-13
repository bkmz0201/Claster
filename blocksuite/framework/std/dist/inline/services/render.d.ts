import type { BaseTextAttributes } from '@blocksuite/store';
import type { InlineEditor } from '../inline-editor.js';
export declare class RenderService<TextAttributes extends BaseTextAttributes> {
    readonly editor: InlineEditor<TextAttributes>;
    private readonly _onYTextChange;
    mount: () => void;
    private _rendering;
    get rendering(): boolean;
    render: () => void;
    rerenderWholeEditor: () => void;
    waitForUpdate: () => Promise<void>;
    constructor(editor: InlineEditor<TextAttributes>);
}
//# sourceMappingURL=render.d.ts.map