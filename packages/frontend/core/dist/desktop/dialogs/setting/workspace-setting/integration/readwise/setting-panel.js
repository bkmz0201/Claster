import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { WorkspaceTagsInlineEditor } from '@affine/core/components/tags';
import { IntegrationService, IntegrationTypeIcon, } from '@affine/core/modules/integration';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';
import { IntegrationSettingHeader, IntegrationSettingItem, IntegrationSettingTextRadioGroup, IntegrationSettingToggle, } from '../setting';
import { ReadwiseConnectButton } from './connect';
import { ReadwiseDisconnectButton } from './connected';
import { ImportDialog } from './import-dialog';
import * as styles from './setting-panel.css';
import { readwiseTrack } from './track';
export const ReadwiseSettingPanel = () => {
    const readwise = useService(IntegrationService).readwise;
    const settings = useLiveData(readwise.settings$);
    const token = settings?.token;
    return token ? _jsx(ReadwiseConnectedSetting, {}) : _jsx(ReadwiseNotConnectedSetting, {});
};
const ReadwiseSettingHeader = ({ action }) => {
    const t = useI18n();
    return (_jsx(IntegrationSettingHeader, { icon: _jsx(IntegrationTypeIcon, { type: "readwise" }), name: t['com.affine.integration.readwise.name'](), desc: t['com.affine.integration.readwise.desc'](), action: action }));
};
const ReadwiseNotConnectedSetting = () => {
    const readwise = useService(IntegrationService).readwise;
    const handleConnectSuccess = useCallback((token) => {
        readwise.connect(token);
    }, [readwise]);
    return (_jsxs("div", { children: [_jsx(ReadwiseSettingHeader, {}), _jsx(ReadwiseConnectButton, { onSuccess: handleConnectSuccess, className: styles.connectButton, prefix: _jsx(PlusIcon, {}), size: "large" })] }));
};
const ReadwiseConnectedSetting = () => {
    const [openImportDialog, setOpenImportDialog] = useState(false);
    const onImport = useCallback(() => {
        setOpenImportDialog(true);
    }, []);
    const closeImportDialog = useCallback(() => {
        setOpenImportDialog(false);
    }, []);
    return (_jsxs("div", { children: [_jsx(ReadwiseSettingHeader, { action: _jsx(ReadwiseDisconnectButton, {}) }), _jsxs("ul", { className: styles.settings, children: [_jsx(TagsSetting, {}), _jsx(Divider, {}), _jsx(NewHighlightSetting, {}), _jsx(Divider, {}), _jsx(UpdateStrategySetting, {}), _jsx(Divider, {}), _jsx(StartImport, { onImport: onImport })] }), openImportDialog && _jsx(ImportDialog, { onClose: closeImportDialog })] }));
};
const trackModifySetting = (item, option, method) => {
    readwiseTrack.modifyIntegrationSettings({
        item,
        option,
        method,
    });
};
const Divider = () => {
    return _jsx("li", { className: styles.divider });
};
const NewHighlightSetting = () => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const syncNewHighlights = useLiveData(useMemo(() => readwise.setting$('syncNewHighlights'), [readwise]));
    const toggle = useCallback((value) => {
        trackModifySetting('New', value ? 'on' : 'off');
        readwise.updateSetting('syncNewHighlights', value);
    }, [readwise]);
    return (_jsx("li", { children: _jsx(IntegrationSettingToggle, { checked: !!syncNewHighlights, name: t['com.affine.integration.readwise.setting.sync-new-name'](), desc: t['com.affine.integration.readwise.setting.sync-new-desc'](), onChange: toggle }) }));
};
const UpdateStrategySetting = () => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const updateStrategy = useLiveData(useMemo(() => readwise.setting$('updateStrategy'), [readwise]));
    const toggle = useCallback((value) => {
        trackModifySetting('Update', value ? 'on' : 'off', 'append');
        if (!value)
            readwise.updateSetting('updateStrategy', undefined);
        else
            readwise.updateSetting('updateStrategy', 'append');
    }, [readwise]);
    const handleUpdate = useCallback((value) => {
        trackModifySetting('Update', 'on', value);
        readwise.updateSetting('updateStrategy', value);
    }, [readwise]);
    const strategies = useMemo(() => [
        {
            name: t['com.affine.integration.readwise.setting.update-append-name'](),
            desc: t['com.affine.integration.readwise.setting.update-append-desc'](),
            value: 'append',
        },
        {
            name: t['com.affine.integration.readwise.setting.update-override-name'](),
            desc: t['com.affine.integration.readwise.setting.update-override-desc'](),
            value: 'override',
        },
    ], [t]);
    return (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(IntegrationSettingToggle, { checked: !!updateStrategy, name: t['com.affine.integration.readwise.setting.update-name'](), desc: t['com.affine.integration.readwise.setting.update-desc'](), onChange: toggle }) }), _jsx("li", { className: styles.updateStrategyGroup, "data-collapsed": !updateStrategy, children: _jsxs("div", { className: styles.updateStrategyGroupContent, children: [_jsx("h6", { className: styles.updateStrategyLabel, children: t['com.affine.integration.readwise.setting.update-strategy']() }), _jsx(IntegrationSettingTextRadioGroup, { items: strategies, checked: updateStrategy, onChange: handleUpdate })] }) })] }));
};
const StartImport = ({ onImport }) => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const handleImport = useCallback(() => {
        const lastImportedAt = readwise.setting$('lastImportedAt').value;
        readwiseTrack.startIntegrationImport({
            method: lastImportedAt ? 'withtimestamp' : 'new',
            control: 'Readwise settings',
        });
        onImport();
    }, [onImport, readwise]);
    return (_jsx(IntegrationSettingItem, { name: t['com.affine.integration.readwise.setting.start-import-name'](), desc: t['com.affine.integration.readwise.setting.start-import-desc'](), children: _jsx(Button, { onClick: handleImport, children: t['com.affine.integration.readwise.setting.start-import-button']() }) }));
};
const TagsSetting = () => {
    const t = useI18n();
    const tagService = useService(TagService);
    const readwise = useService(IntegrationService).readwise;
    const tagMetas = useLiveData(tagService.tagList.tagMetas$);
    const tagIds = useLiveData(useMemo(() => readwise.setting$('tags'), [readwise]));
    const updateReadwiseTags = useCallback((tagIds) => {
        readwise.updateSetting('tags', tagIds.filter(id => !!tagMetas.some(tag => tag.id === id)));
    }, [tagMetas, readwise]);
    const onSelectTag = useCallback((tagId) => {
        trackModifySetting('Tag', 'on');
        updateReadwiseTags([...(tagIds ?? []), tagId]);
    }, [tagIds, updateReadwiseTags]);
    const onDeselectTag = useCallback((tagId) => {
        trackModifySetting('Tag', 'off');
        updateReadwiseTags(tagIds?.filter(id => id !== tagId) ?? []);
    }, [tagIds, updateReadwiseTags]);
    return (_jsxs("li", { children: [_jsx("h6", { className: styles.tagsLabel, children: t['com.affine.integration.readwise.setting.tags-label']() }), _jsx(WorkspaceTagsInlineEditor, { placeholder: _jsx("span", { className: styles.tagsPlaceholder, children: t['com.affine.integration.readwise.setting.tags-placeholder']() }), className: styles.tagsEditor, tagMode: "inline-tag", selectedTags: tagIds ?? [], onSelectTag: onSelectTag, onDeselectTag: onDeselectTag, modalMenu: true, menuClassName: styles.tagsMenu })] }));
};
//# sourceMappingURL=setting-panel.js.map