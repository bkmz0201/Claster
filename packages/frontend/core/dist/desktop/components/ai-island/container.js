import { jsx as _jsx } from "react/jsx-runtime";
import { DocsService } from '@affine/core/modules/doc';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { islandContainer } from './container.css';
export const IslandContainer = (props) => {
    const docId = useLiveData(useService(GlobalContextService).globalContext.docId.$);
    const docRecordList = useService(DocsService).list;
    const doc = useLiveData(docId ? docRecordList.doc$(docId) : undefined);
    const inTrash = useLiveData(doc?.meta$)?.trash;
    return (_jsx("div", { className: clsx(islandContainer, { trash: inTrash }, props.className), children: props.children }));
};
//# sourceMappingURL=container.js.map