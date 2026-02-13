import { jsx as _jsx } from "react/jsx-runtime";
import { EmptyCollections } from '@affine/core/components/affine/empty';
import { CollectionService } from '@affine/core/modules/collection';
import { useLiveData, useService } from '@toeverything/infra';
import { CollectionListItem } from './item';
import { list } from './styles.css';
export const CollectionList = () => {
    const collectionService = useService(CollectionService);
    const collectionMetas = useLiveData(collectionService.collectionMetas$);
    if (!collectionMetas.length) {
        return _jsx(EmptyCollections, { absoluteCenter: true });
    }
    return (_jsx("ul", { className: list, children: collectionMetas.map(meta => (_jsx(CollectionListItem, { meta: meta }, meta.id))) }));
};
//# sourceMappingURL=list.js.map