import { ColorScheme } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { LifeCycleWatcher } from '@blocksuite/std';
import { signal } from '@preact/signals-core';
import { createHighlighterCore, createOnigurumaEngine, } from 'shiki';
import getWasm from 'shiki/wasm';
import { CodeBlockConfigExtension } from './code-block-config.js';
import { CODE_BLOCK_DEFAULT_DARK_THEME, CODE_BLOCK_DEFAULT_LIGHT_THEME, } from './highlight/const.js';
export class CodeBlockHighlighter extends LifeCycleWatcher {
    constructor() {
        super(...arguments);
        this.highlighter$ = signal(null);
        this._loadTheme = async (highlighter) => {
            // It is possible that by the time the highlighter is ready all instances
            // have already been unmounted. In that case there is no need to load
            // themes or update state.
            if (CodeBlockHighlighter._refCount === 0) {
                return;
            }
            const config = this.std.getOptional(CodeBlockConfigExtension.identifier);
            const darkTheme = config?.theme?.dark ?? CODE_BLOCK_DEFAULT_DARK_THEME;
            const lightTheme = config?.theme?.light ?? CODE_BLOCK_DEFAULT_LIGHT_THEME;
            this._darkThemeKey = (await normalizeGetter(darkTheme)).name;
            this._lightThemeKey = (await normalizeGetter(lightTheme)).name;
            await highlighter.loadTheme(darkTheme, lightTheme);
            this.highlighter$.value = highlighter;
        };
    }
    static { this.key = 'code-block-highlighter'; }
    // Singleton highlighter instance
    static { this._sharedHighlighter = null; }
    static { this._highlighterPromise = null; }
    static { this._refCount = 0; }
    get themeKey() {
        const theme = this.std.get(ThemeProvider).theme$.value;
        return theme === ColorScheme.Dark
            ? this._darkThemeKey
            : this._lightThemeKey;
    }
    static async _getOrCreateHighlighter() {
        if (CodeBlockHighlighter._sharedHighlighter) {
            return CodeBlockHighlighter._sharedHighlighter;
        }
        if (!CodeBlockHighlighter._highlighterPromise) {
            CodeBlockHighlighter._highlighterPromise = createHighlighterCore({
                engine: createOnigurumaEngine(() => getWasm),
            }).then(highlighter => {
                CodeBlockHighlighter._sharedHighlighter = highlighter;
                return highlighter;
            });
        }
        return CodeBlockHighlighter._highlighterPromise;
    }
    mounted() {
        super.mounted();
        CodeBlockHighlighter._refCount++;
        CodeBlockHighlighter._getOrCreateHighlighter()
            .then(this._loadTheme)
            .catch(console.error);
    }
    unmounted() {
        CodeBlockHighlighter._refCount--;
        // Dispose the shared highlighter **after** any in-flight creation finishes.
        if (CodeBlockHighlighter._refCount !== 0) {
            return;
        }
        const doDispose = (highlighter) => {
            if (highlighter) {
                highlighter.dispose();
            }
            CodeBlockHighlighter._sharedHighlighter = null;
            CodeBlockHighlighter._highlighterPromise = null;
        };
        if (CodeBlockHighlighter._sharedHighlighter) {
            // Highlighter already created – dispose immediately.
            doDispose(CodeBlockHighlighter._sharedHighlighter);
        }
        else if (CodeBlockHighlighter._highlighterPromise) {
            // Highlighter still being created – wait for it, then dispose.
            CodeBlockHighlighter._highlighterPromise
                .then(doDispose)
                .catch(console.error);
        }
    }
}
/**
 * https://github.com/shikijs/shiki/blob/933415cdc154fe74ccfb6bbb3eb6a7b7bf183e60/packages/core/src/internal.ts#L31
 */
export async function normalizeGetter(p) {
    return Promise.resolve(typeof p === 'function' ? p() : p).then(r => r.default || r);
}
//# sourceMappingURL=code-block-service.js.map