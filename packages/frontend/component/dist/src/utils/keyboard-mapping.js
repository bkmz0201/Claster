import { isMacOS } from './platform';
const macOS = isMacOS();
export const getCommand = (cmd) => {
    if (cmd === '$mod')
        return macOS ? '⌘' : 'Ctrl';
    if (cmd === '$alt')
        return macOS ? '⌥' : 'Alt';
    if (cmd === '$shift')
        return macOS ? '⇧' : 'Shift';
    return cmd;
};
//# sourceMappingURL=keyboard-mapping.js.map