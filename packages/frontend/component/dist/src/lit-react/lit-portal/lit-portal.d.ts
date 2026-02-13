import { LitElement, type TemplateResult } from 'lit';
type PortalEvent = {
    name: 'connectedCallback' | 'disconnectedCallback' | 'willUpdate';
    target: LitReactPortal;
};
type PortalListener = (event: PortalEvent) => void;
export declare const LIT_REACT_PORTAL = "lit-react-portal";
declare class LitReactPortal extends LitElement {
    portalId: string;
    notify?: PortalListener;
    static get properties(): {
        portalId: {
            type: StringConstructor;
        };
        notify: {
            attribute: boolean;
        };
    };
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    createRenderRoot(): this;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        [LIT_REACT_PORTAL]: LitReactPortal;
    }
}
export type ElementOrFactory = React.ReactNode | (() => React.ReactNode);
type LitPortal = {
    id: string;
    portal: React.ReactPortal;
    litElement: LitReactPortal;
};
export type ReactToLit = (elementOrFactory: ElementOrFactory, rerendering?: boolean) => TemplateResult;
export declare const useLitPortalFactory: () => readonly [ReactToLit, LitPortal[]];
export declare const useLitPortal: (elementOrFactory: ElementOrFactory) => {
    template: TemplateResult<1>;
    portal: import("react").ReactPortal | undefined;
};
export {};
//# sourceMappingURL=lit-portal.d.ts.map