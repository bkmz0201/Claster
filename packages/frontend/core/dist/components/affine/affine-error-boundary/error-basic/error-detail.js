import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable, ThemedImg } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { Trans, useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import { ActionButton } from '../../empty/action-button';
import imageUrlForDark404 from '../error-assets/404.dark.png';
import imageUrlForLight404 from '../error-assets/404.light.png';
import imageUrlForDark500 from '../error-assets/500.dark.png';
import imageUrlForLight500 from '../error-assets/500.light.png';
import * as styles from './error-detail.css';
export var ErrorStatus;
(function (ErrorStatus) {
    ErrorStatus[ErrorStatus["NotFound"] = 404] = "NotFound";
    ErrorStatus[ErrorStatus["Unexpected"] = 500] = "Unexpected";
})(ErrorStatus || (ErrorStatus = {}));
const imageMap = new Map([
    [
        ErrorStatus.NotFound,
        {
            light: imageUrlForLight404,
            dark: imageUrlForDark404,
        },
    ],
    [
        ErrorStatus.Unexpected,
        {
            light: imageUrlForLight500, // TODO(@catsjuice): Split assets lib and use image hook to handle light and dark.
            dark: imageUrlForDark500,
        },
    ],
]);
/**
 * TODO(@eyhn): Unify with NotFoundPage.
 */
export const ErrorDetail = props => {
    const { status = ErrorStatus.Unexpected, description, onButtonClick, resetError, error, } = props;
    const descriptions = Array.isArray(description) ? description : [description];
    const [isBtnLoading, setBtnLoading] = useState(false);
    const [showStack, setShowStack] = useState(false);
    const t = useI18n();
    const onToggleStack = useCallback(() => {
        setShowStack(!showStack);
    }, [showStack]);
    const onBtnClick = useAsyncCallback(async () => {
        try {
            setBtnLoading(true);
            await onButtonClick?.();
            resetError?.(); // Only reset when retry success.
        }
        finally {
            setBtnLoading(false);
        }
    }, [onButtonClick, resetError]);
    const desc = descriptions.map((item, i) => (_jsx("p", { className: styles.text, children: item }, `error-desc-${i}`)));
    return (_jsx("div", { className: styles.errorLayout, children: _jsxs("div", { className: styles.errorContainer, "data-show-stack": showStack, children: [_jsx(ThemedImg, { style: { width: '300px' }, draggable: false, className: styles.illustration, lightSrc: imageMap.get(status)?.light || imageUrlForLight404, darkSrc: imageMap.get(status)?.dark || imageUrlForDark404 }), _jsxs("div", { className: styles.label, children: [_jsx("div", { className: styles.text, children: props.title }), _jsx("div", { className: styles.text, children: desc })] }), _jsxs(Scrollable.Root, { className: styles.scrollArea, "data-show-stack": showStack, children: [_jsx(Scrollable.Viewport, { children: error?.stack || 'No detailed error stack is provided.' }), _jsx(Scrollable.Scrollbar, {})] }), _jsxs("div", { className: styles.actionContainer, children: [error?.stack ? (_jsx(ActionButton, { onClick: onToggleStack, className: styles.actionButton, children: _jsxs("div", { className: styles.actionContent, children: [_jsx("span", { children: t['com.affine.error.hide-error']() }), _jsx(ArrowDownSmallIcon, { "data-show-stack": showStack, className: styles.arrowIcon })] }) })) : null, _jsx(ActionButton, { onClick: onBtnClick, className: styles.actionButton, loading: isBtnLoading, variant: "primary", children: props.buttonText ?? t['com.affine.error.reload']() })] })] }) }));
};
export function ContactUS() {
    return (_jsx(Trans, { i18nKey: "com.affine.error.contact-us", components: {
            1: (_jsx("a", { style: { color: 'var(--affine-primary-color)' }, href: "https://community.affine.pro", target: "__blank" })),
        } }));
}
//# sourceMappingURL=error-detail.js.map