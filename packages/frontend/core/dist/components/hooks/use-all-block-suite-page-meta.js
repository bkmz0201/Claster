import { atom, useAtomValue } from 'jotai';
const weakMap = new WeakMap();
// this hook is extracted from './use-block-suite-page-meta.ts' to avoid circular dependency
export function useAllBlockSuiteDocMeta(docCollection) {
    if (!weakMap.has(docCollection)) {
        const baseAtom = atom([...docCollection.meta.docMetas]);
        weakMap.set(docCollection, baseAtom);
        baseAtom.onMount = set => {
            set([...docCollection.meta.docMetas]);
            const dispose = docCollection.slots.docListUpdated.subscribe(() => {
                set([...docCollection.meta.docMetas]);
            });
            return () => {
                dispose.unsubscribe();
            };
        };
    }
    return useAtomValue(weakMap.get(docCollection));
}
//# sourceMappingURL=use-all-block-suite-page-meta.js.map