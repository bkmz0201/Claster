import { Service } from '@toeverything/infra';
import type { EditorScope } from '../scopes/editor';
export declare class EditorService extends Service {
    readonly scope: EditorScope;
    readonly editor: import("..").Editor;
    constructor(scope: EditorScope);
}
//# sourceMappingURL=editor.d.ts.map