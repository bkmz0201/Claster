import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cssVarV2 } from '@toeverything/theme/v2';
import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '../button';
import { RadioGroup } from '../radio';
import * as styles from './icon-picker.css';
import { AffineIconPicker } from './picker/affine-icon/affine-icon-picker';
import { EmojiPicker } from './picker/emoji/emoji-picker';
import { IconType } from './type';
const panels = [
    { value: 'Emoji', className: styles.headerNavItem },
    { value: 'Icons', className: styles.headerNavItem },
];
export const IconPicker = ({ className, style, onSelect, }) => {
    const [activePanel, setActivePanel] = useState('Emoji');
    return (_jsxs("div", { className: clsx(styles.container, className), style: { ...style }, children: [_jsx("header", { className: styles.header, children: _jsxs("div", { className: styles.headerContent, children: [_jsx(RadioGroup, { items: panels, value: activePanel, onChange: setActivePanel, gap: 12, padding: 0, borderRadius: 4, className: styles.headerNav, indicatorStyle: {
                                backgroundColor: cssVarV2.button.primary,
                                height: 2,
                                bottom: -6,
                                top: 'unset',
                            } }), _jsx(Button, { variant: "plain", style: { color: cssVarV2.text.secondary, fontWeight: 500 }, onClick: () => onSelect?.(), children: "Remove" })] }) }), _jsx("main", { className: styles.main, children: activePanel === 'Emoji' ? (_jsx(EmojiPicker, { onSelect: emoji => {
                        onSelect?.({ type: IconType.Emoji, unicode: emoji });
                    } })) : activePanel === 'Icons' ? (_jsx(AffineIconPicker, { onSelect: (icon, color) => {
                        onSelect?.({ type: IconType.AffineIcon, name: icon, color });
                    } })) : null })] }));
};
//# sourceMappingURL=icon-picker.js.map