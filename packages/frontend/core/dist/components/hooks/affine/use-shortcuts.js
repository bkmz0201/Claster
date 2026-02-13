import { useI18n } from '@affine/i18n';
import { useCallback, useMemo } from 'react';
// TODO(550): remove this hook after 'useI18n' support scoped i18n
const useKeyboardShortcutsI18N = () => {
    const t = useI18n();
    return useCallback((key) => t[`com.affine.keyboardShortcuts.${key}`](), [t]);
};
// TODO(550): remove this hook after 'useI18n' support scoped i18n
const useHeadingKeyboardShortcutsI18N = () => {
    const t = useI18n();
    return useCallback((number) => t['com.affine.keyboardShortcuts.heading']({ number }), [t]);
};
export const useWinGeneralKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('cancel')]: ['ESC'],
        [t('quickSearch')]: ['Ctrl', 'K'],
        [t('newPage')]: ['Ctrl', 'N'],
        // not implement yet
        // [t('appendDailyNote')]: 'Ctrl + Alt + A',
        [t('expandOrCollapseSidebar')]: ['Ctrl', '/'],
        [t('goBack')]: ['Ctrl', '['],
        [t('goForward')]: ['Ctrl', ']'],
        [t('copy-private-link')]: ['⌘', '⇧', 'C'],
    }), [t]);
};
export const useMacGeneralKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('cancel')]: ['ESC'],
        [t('quickSearch')]: ['⌘', 'K'],
        [t('newPage')]: ['⌘', 'N'],
        // not implement yet
        // [t('appendDailyNote')]: '⌘ + ⌥ + A',
        [t('expandOrCollapseSidebar')]: ['⌘', '/'],
        [t('goBack')]: ['⌘ ', '['],
        [t('goForward')]: ['⌘ ', ']'],
        [t('copy-private-link')]: ['⌘', '⇧', 'C'],
    }), [t]);
};
export const useMacEdgelessKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('selectAll')]: ['⌘', 'A'],
        [t('undo')]: ['⌘', 'Z'],
        [t('redo')]: ['⌘', '⇧', 'Z'],
        [t('zoomIn')]: ['⌘', '+'],
        [t('zoomOut')]: ['⌘', '-'],
        [t('zoomTo100')]: ['Alt', '0'],
        [t('zoomToFit')]: ['Alt', '1'],
        [t('zoomToSelection')]: ['Alt', '2'],
        [t('select')]: ['V'],
        [t('text')]: ['T'],
        [t('shape')]: ['S'],
        [t('image')]: ['I'],
        [t('connector')]: ['C'],
        [t('pen')]: ['P'],
        [t('hand')]: ['H'],
        [t('note')]: ['N'],
        // not implement yet
        // [t('group')]: '⌘ + G',
        // [t('unGroup')]: '⌘ + ⇧ + G',
    }), [t]);
};
export const useWinEdgelessKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('selectAll')]: ['Ctrl', 'A'],
        [t('undo')]: ['Ctrl', 'Z'],
        [t('redo')]: ['Ctrl', 'Y/Ctrl', 'Shift', 'Z'],
        [t('zoomIn')]: ['Ctrl', '+'],
        [t('zoomOut')]: ['Ctrl', '-'],
        [t('zoomTo100')]: ['Alt', '0'],
        [t('zoomToFit')]: ['Alt', '1'],
        [t('zoomToSelection')]: ['Alt', '2'],
        [t('select')]: ['V'],
        [t('text')]: ['T'],
        [t('shape')]: ['S'],
        [t('image')]: ['I'],
        [t('connector')]: ['C'],
        [t('pen')]: ['P'],
        [t('hand')]: ['H'],
        [t('note')]: ['N'],
        [t('switch')]: ['Alt ', ''],
        // not implement yet
        // [t('group')]: 'Ctrl + G',
        // [t('unGroup')]: 'Ctrl + Shift + G',
    }), [t]);
};
export const useMacPageKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    const tH = useHeadingKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('undo')]: ['⌘', 'Z'],
        [t('redo')]: ['⌘', '⇧', 'Z'],
        [t('bold')]: ['⌘', 'B'],
        [t('italic')]: ['⌘', 'I'],
        [t('underline')]: ['⌘', 'U'],
        [t('strikethrough')]: ['⌘', '⇧', 'S'],
        [t('inlineCode')]: ['⌘', 'E'],
        [t('codeBlock')]: ['⌘', '⌥', 'C'],
        [t('link')]: ['⌘', 'K'],
        [t('quickSearch')]: ['⌘', 'K'],
        [t('bodyText')]: ['⌘', '⌥', '0'],
        [tH('1')]: ['⌘', '⌥', '1'],
        [tH('2')]: ['⌘', '⌥', '2'],
        [tH('3')]: ['⌘', '⌥', '3'],
        [tH('4')]: ['⌘', '⌥', '4'],
        [tH('5')]: ['⌘', '⌥', '5'],
        [tH('6')]: ['⌘', '⌥', '6'],
        [t('increaseIndent')]: ['Tab'],
        [t('reduceIndent')]: ['⇧', 'Tab'],
        [t('alignLeft')]: ['⌘', '⇧', 'L'],
        [t('alignCenter')]: ['⌘', '⇧', 'E'],
        [t('alignRight')]: ['⌘', '⇧', 'R'],
        [t('groupDatabase')]: ['⌘', 'G'],
        [t('switch')]: ['⌥', 'S'],
        // not implement yet
        // [t('moveUp')]: '⌘ + ⌥ + ↑',
        // [t('moveDown')]: '⌘ + ⌥ + ↓',
    }), [t, tH]);
};
export const useMacMarkdownShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    const tH = useHeadingKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('bold')]: ['**Text**'],
        [t('italic')]: ['*Text*'],
        [t('underline')]: ['~Text~'],
        [t('strikethrough')]: ['~~Text~~'],
        [t('divider')]: ['***'],
        [t('inlineCode')]: ['`Text` '],
        [t('codeBlock')]: ['``` Space'],
        [tH('1')]: ['# Text'],
        [tH('2')]: ['## Text'],
        [tH('3')]: ['### Text'],
        [tH('4')]: ['#### Text'],
        [tH('5')]: ['##### Text'],
        [tH('6')]: ['###### Text'],
    }), [t, tH]);
};
export const useWinPageKeyboardShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    const tH = useHeadingKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('undo')]: ['Ctrl', 'Z'],
        [t('redo')]: ['Ctrl', 'Y'],
        [t('bold')]: ['Ctrl', 'B'],
        [t('italic')]: ['Ctrl', 'I'],
        [t('underline')]: ['Ctrl', 'U'],
        [t('strikethrough')]: ['Ctrl', 'Shift', 'S'],
        [t('inlineCode')]: [' Ctrl', 'E'],
        [t('codeBlock')]: ['Ctrl', 'Alt', 'C'],
        [t('link')]: ['Ctr', 'K'],
        [t('quickSearch')]: ['Ctrl', 'K'],
        [t('bodyText')]: ['Ctrl', 'Shift', '0'],
        [tH('1')]: ['Ctrl', 'Shift', '1'],
        [tH('2')]: ['Ctrl', 'Shift', '2'],
        [tH('3')]: ['Ctrl', 'Shift', '3'],
        [tH('4')]: ['Ctrl', 'Shift', '4'],
        [tH('5')]: ['Ctrl', 'Shift', '5'],
        [tH('6')]: ['Ctrl', 'Shift', '6'],
        [t('increaseIndent')]: ['Tab'],
        [t('reduceIndent')]: ['Shift+Tab'],
        [t('alignLeft')]: ['Ctrl', 'Shift', 'L'],
        [t('alignCenter')]: ['Ctrl', 'Shift', 'E'],
        [t('alignRight')]: ['Ctrl', 'Shift', 'R'],
        [t('groupDatabase')]: ['Ctrl + G'],
        ['Switch']: ['Alt + S'],
        // not implement yet
        // [t('moveUp')]: 'Ctrl + Alt + ↑',
        // [t('moveDown')]: 'Ctrl + Alt + ↓',
    }), [t, tH]);
};
export const useWinMarkdownShortcuts = () => {
    const t = useKeyboardShortcutsI18N();
    const tH = useHeadingKeyboardShortcutsI18N();
    return useMemo(() => ({
        [t('bold')]: ['**Text** '],
        [t('italic')]: ['*Text* '],
        [t('underline')]: ['~Text~ '],
        [t('strikethrough')]: ['~~Text~~ '],
        [t('divider')]: ['***'],
        [t('inlineCode')]: ['`Text` '],
        [t('codeBlock')]: ['``` Text'],
        [tH('1')]: ['# Text'],
        [tH('2')]: ['## Text'],
        [tH('3')]: ['### Text'],
        [tH('4')]: ['#### Text'],
        [tH('5')]: ['##### Text'],
        [tH('6')]: ['###### Text'],
    }), [t, tH]);
};
const shortcutsMap = environment.isMacOs
    ? {
        useMarkdownShortcuts: useMacMarkdownShortcuts,
        usePageShortcuts: useMacPageKeyboardShortcuts,
        useEdgelessShortcuts: useMacEdgelessKeyboardShortcuts,
        useGeneralShortcuts: useMacGeneralKeyboardShortcuts,
    }
    : {
        useMarkdownShortcuts: useWinMarkdownShortcuts,
        usePageShortcuts: useWinPageKeyboardShortcuts,
        useEdgelessShortcuts: useWinEdgelessKeyboardShortcuts,
        useGeneralShortcuts: useWinGeneralKeyboardShortcuts,
    };
export const useMarkdownShortcuts = () => {
    const t = useI18n();
    const shortcuts = shortcutsMap.useMarkdownShortcuts();
    return {
        title: t['com.affine.shortcutsTitle.markdownSyntax'](),
        shortcuts,
    };
};
export const usePageShortcuts = () => {
    const t = useI18n();
    const shortcuts = shortcutsMap.usePageShortcuts();
    return {
        title: t['com.affine.shortcutsTitle.page'](),
        shortcuts,
    };
};
export const useEdgelessShortcuts = () => {
    const t = useI18n();
    const shortcuts = shortcutsMap.useEdgelessShortcuts();
    return {
        title: t['com.affine.shortcutsTitle.edgeless'](),
        shortcuts,
    };
};
export const useGeneralShortcuts = () => {
    const t = useI18n();
    const shortcuts = shortcutsMap.useGeneralShortcuts();
    return {
        title: t['com.affine.shortcutsTitle.general'](),
        shortcuts,
    };
};
//# sourceMappingURL=use-shortcuts.js.map