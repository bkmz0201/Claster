import { cloneElement } from 'react';
export const ProviderComposer = ({ contexts, children, }) => contexts.reduceRight((kids, parent) => cloneElement(parent, {
    children: kids,
}), children);
//# sourceMappingURL=index.js.map