import { Service } from '@toeverything/infra';
export class EditorService extends Service {
    constructor(scope) {
        super();
        this.scope = scope;
        this.editor = this.scope.props.editor;
    }
}
//# sourceMappingURL=editor.js.map