import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroup } from '@affine/component';
import { allPageFilterSelectAtom } from '@affine/core/components/atoms';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './index.css';
export const WorkspaceModeFilterTab = ({ activeFilter, }) => {
    const t = useI18n();
    const [value, setValue] = useState(activeFilter);
    const [filterMode, setFilterMode] = useAtom(allPageFilterSelectAtom);
    const workbenchService = useService(WorkbenchService);
    const handleValueChange = useCallback((value) => {
        switch (value) {
            case 'collections':
                workbenchService.workbench.openCollections();
                break;
            case 'tags':
                workbenchService.workbench.openTags();
                break;
            case 'docs':
                workbenchService.workbench.openAll();
                break;
        }
    }, [workbenchService.workbench]);
    useEffect(() => {
        if (value !== activeFilter) {
            setValue(activeFilter);
            setFilterMode(activeFilter);
        }
    }, [activeFilter, filterMode, setFilterMode, value]);
    return (_jsx(RadioGroup, { style: { maxWidth: '100%', width: 273 }, value: value, onChange: handleValueChange, items: useMemo(() => [
            {
                value: 'docs',
                label: t['com.affine.docs.header'](),
                testId: 'workspace-docs-button',
                className: styles.filterTab,
            },
            {
                value: 'collections',
                label: t['com.affine.collections.header'](),
                testId: 'workspace-collections-button',
                className: styles.filterTab,
            },
            {
                value: 'tags',
                label: t['Tags'](),
                testId: 'workspace-tags-button',
                className: styles.filterTab,
            },
        ], [t]) }));
};
//# sourceMappingURL=index.js.map