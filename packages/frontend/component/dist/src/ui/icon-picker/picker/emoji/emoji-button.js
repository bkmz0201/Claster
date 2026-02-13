import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback } from 'react';
import { IconButton } from '../../../button';
// Memoized individual emoji button to prevent unnecessary re-renders
export const EmojiButton = memo(function EmojiButton({ emoji, onSelect, }) {
    const handleClick = useCallback(() => {
        onSelect(emoji);
    }, [emoji, onSelect]);
    return (_jsx(IconButton, { size: 24, style: { padding: 4 }, icon: _jsx("span", { children: emoji }), iconStyle: { justifyContent: 'center' }, onClick: handleClick }, emoji));
});
//# sourceMappingURL=emoji-button.js.map