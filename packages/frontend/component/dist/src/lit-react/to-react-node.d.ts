import { LitElement, type TemplateResult } from 'lit';
import { type ReactNode } from 'react';
export declare class LitTemplateWrapper extends LitElement {
    static get properties(): {
        template: {
            type: ObjectConstructor;
        };
    };
    template: TemplateResult | null;
    createRenderRoot(): this;
    render(): TemplateResult | null;
}
export declare const toReactNode: (template?: TemplateResult | string) => ReactNode;
//# sourceMappingURL=to-react-node.d.ts.map