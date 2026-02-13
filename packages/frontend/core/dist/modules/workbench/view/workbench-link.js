import { jsx as _jsx } from "react/jsx-runtime";
import { useDraggable } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { inferOpenMode as inferOpenAt } from '@affine/core/utils';
import { useLiveData, useServices } from '@toeverything/infra';
import {} from 'history';
import { forwardRef } from 'react';
import { resolveRouteLinkMeta } from '../../navigation/utils';
import { WorkbenchService } from '../services/workbench';
function resolveToEntity(to, basename) {
    const link = basename +
        (typeof to === 'string' ? to : `${to.pathname}${to.search}${to.hash}`);
    const info = resolveRouteLinkMeta(link);
    if (info?.moduleName === 'doc') {
        return {
            type: 'doc',
            id: info.docId,
        };
    }
    else if (info?.moduleName === 'collection') {
        return {
            type: 'collection',
            id: info.subModuleName,
        };
    }
    else if (info?.moduleName === 'tag') {
        return {
            type: 'tag',
            id: info.subModuleName,
        };
    }
    return undefined;
}
export const WorkbenchLink = forwardRef(function WorkbenchLink({ to, onClick, draggable = true, replaceHistory, ...other }, ref) {
    const { workbenchService } = useServices({
        WorkbenchService,
    });
    const workbench = workbenchService.workbench;
    const basename = useLiveData(workbench.basename$);
    const stringTo = typeof to === 'string' ? to : `${to.pathname}${to.search}${to.hash}`;
    const link = basename + stringTo;
    const handleClick = useAsyncCallback(async (event) => {
        // a trick to prevent click from modal overlay propagation
        if (!event.currentTarget.contains(event.target)) {
            return;
        }
        onClick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        if (event.button !== 0 && event.button !== 1) {
            return;
        }
        const at = inferOpenAt(event);
        workbench.open(to, { at, replaceHistory, show: false });
        event.preventDefault();
        event.stopPropagation();
    }, [onClick, replaceHistory, to, workbench]);
    const { dragRef } = useDraggable(() => {
        return {
            data: {
                entity: resolveToEntity(to, basename),
                from: {
                    at: 'workbench:link',
                    to: stringTo,
                },
            },
            canDrag: typeof draggable === 'boolean' ? draggable : draggable === 'true',
        };
    }, [to, basename, stringTo, draggable]);
    return (_jsx("a", { ...other, ref: node => {
            dragRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
        }, href: link, onClick: handleClick, onAuxClick: handleClick }));
});
//# sourceMappingURL=workbench-link.js.map