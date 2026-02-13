import { jsx as _jsx } from "react/jsx-runtime";
import { useBindWorkbenchToBrowserRouter, WorkbenchService, } from '@affine/core/modules/workbench';
import { ViewRoot } from '@affine/core/modules/workbench/view/view-root';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export const MobileWorkbenchRoot = ({ routes }) => {
    const workbench = useService(WorkbenchService).workbench;
    // for debugging
    window.workbench = workbench;
    const views = useLiveData(workbench.views$);
    const location = useLocation();
    const basename = location.pathname.match(/\/workspace\/[^/]+/g)?.[0] ?? '/';
    useBindWorkbenchToBrowserRouter(workbench, basename);
    useEffect(() => {
        workbench.updateBasename(basename);
    }, [basename, workbench]);
    return _jsx(ViewRoot, { routes: routes, view: views[0] });
};
//# sourceMappingURL=workbench-root.js.map