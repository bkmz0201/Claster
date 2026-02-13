import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, MenuItem, MenuSeparator, useConfirmModal, } from '@affine/component';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { Trans, useI18n } from '@affine/i18n';
import { DeleteIcon, InvisibleIcon, ViewIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState, } from 'react';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import { WorkspacePropertyIconSelector } from '../icons/icons-selector';
import { WorkspacePropertyIcon } from '../icons/workspace-property-icon';
import * as styles from './edit-doc-property.css';
export const EditWorkspacePropertyMenuItems = ({ propertyId, onPropertyInfoChange, readonly, }) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const propertyInfo = useLiveData(workspacePropertyService.propertyInfo$(propertyId));
    const propertyType = propertyInfo?.type;
    const typeInfo = propertyType && isSupportedWorkspacePropertyType(propertyType)
        ? WorkspacePropertyTypes[propertyType]
        : undefined;
    const propertyName = propertyInfo?.name ||
        (typeInfo?.name ? t.t(typeInfo.name) : t['unnamed']());
    const [name, setName] = useState(propertyName);
    const confirmModal = useConfirmModal();
    useEffect(() => {
        setName(propertyName);
    }, [propertyName]);
    const onKeyDown = useCallback(e => {
        if (e.key !== 'Escape') {
            e.stopPropagation();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            workspacePropertyService.updatePropertyInfo(propertyId, {
                name: e.currentTarget.value,
            });
        }
    }, [workspacePropertyService, propertyId]);
    const handleBlur = useCallback((e) => {
        workspacePropertyService.updatePropertyInfo(propertyId, {
            name: e.currentTarget.value,
        });
        onPropertyInfoChange?.('name', e.currentTarget.value);
    }, [workspacePropertyService, propertyId, onPropertyInfoChange]);
    const handleIconChange = useCallback((iconName) => {
        workspacePropertyService.updatePropertyInfo(propertyId, {
            icon: iconName,
        });
        onPropertyInfoChange?.('icon', iconName);
    }, [workspacePropertyService, propertyId, onPropertyInfoChange]);
    const handleNameChange = useCallback((e) => {
        setName(e);
    }, []);
    const handleClickAlwaysShow = useCallback((e) => {
        e.preventDefault(); // avoid radix-ui close the menu
        workspacePropertyService.updatePropertyInfo(propertyId, {
            show: 'always-show',
        });
        onPropertyInfoChange?.('show', 'always-show');
    }, [workspacePropertyService, propertyId, onPropertyInfoChange]);
    const handleClickHideWhenEmpty = useCallback((e) => {
        e.preventDefault(); // avoid radix-ui close the menu
        workspacePropertyService.updatePropertyInfo(propertyId, {
            show: 'hide-when-empty',
        });
        onPropertyInfoChange?.('show', 'hide-when-empty');
    }, [workspacePropertyService, propertyId, onPropertyInfoChange]);
    const handleClickAlwaysHide = useCallback((e) => {
        e.preventDefault(); // avoid radix-ui close the menu
        workspacePropertyService.updatePropertyInfo(propertyId, {
            show: 'always-hide',
        });
        onPropertyInfoChange?.('show', 'always-hide');
    }, [workspacePropertyService, propertyId, onPropertyInfoChange]);
    if (!propertyInfo || !isSupportedWorkspacePropertyType(propertyType)) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: BUILD_CONFIG.isMobileEdition
                    ? styles.mobilePropertyRowNamePopupRow
                    : styles.propertyRowNamePopupRow, "data-testid": "edit-property-menu-item", children: [_jsx(WorkspacePropertyIconSelector, { propertyInfo: propertyInfo, readonly: readonly, onSelectedChange: handleIconChange }), typeInfo?.renameable === false || readonly ? (_jsx("span", { className: styles.propertyName, children: name })) : (_jsx(Input, { value: name, onBlur: handleBlur, onChange: handleNameChange, placeholder: t['unnamed'](), onKeyDown: onKeyDown, size: "large", style: { borderRadius: 4, height: 30 } }))] }), _jsxs("div", { className: BUILD_CONFIG.isMobileEdition
                    ? styles.mobilePropertyRowTypeItem
                    : styles.propertyRowTypeItem, children: [t['com.affine.page-properties.create-property.menu.header'](), _jsxs("div", { className: styles.propertyTypeName, children: [_jsx(WorkspacePropertyIcon, { propertyInfo: propertyInfo }), t[`com.affine.page-properties.property.${propertyType}`]()] })] }), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(ViewIcon, {}), onClick: handleClickAlwaysShow, selected: propertyInfo.show !== 'hide-when-empty' &&
                    propertyInfo.show !== 'always-hide', "data-property-visibility": "always-show", disabled: readonly, children: t['com.affine.page-properties.property.always-show']() }), _jsx(MenuItem, { prefixIcon: _jsx(InvisibleIcon, {}), onClick: handleClickHideWhenEmpty, selected: propertyInfo.show === 'hide-when-empty', "data-property-visibility": "hide-when-empty", disabled: readonly, children: t['com.affine.page-properties.property.hide-when-empty']() }), _jsx(MenuItem, { prefixIcon: _jsx(InvisibleIcon, {}), onClick: handleClickAlwaysHide, selected: propertyInfo.show === 'always-hide', "data-property-visibility": "always-hide", disabled: readonly, children: t['com.affine.page-properties.property.always-hide']() }), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", disabled: readonly, onClick: () => {
                    confirmModal.openConfirmModal({
                        title: t['com.affine.settings.workspace.properties.delete-property'](),
                        description: (_jsxs(Trans, { values: {
                                name: name,
                            }, i18nKey: "com.affine.settings.workspace.properties.delete-property-desc", children: ["The ", _jsx("strong", { children: { name: name } }), " property will be removed from count doc(s). This action cannot be undone."] })),
                        confirmText: t['Confirm'](),
                        onConfirm: () => {
                            workspacePropertyService.removeProperty(propertyId);
                        },
                        confirmButtonOptions: {
                            variant: 'error',
                        },
                    });
                }, children: t['com.affine.settings.workspace.properties.delete-property']() })] }));
};
//# sourceMappingURL=edit-doc-property.js.map