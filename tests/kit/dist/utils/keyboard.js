var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import {} from '@playwright/test';
import { AsyncLock } from '@toeverything/infra/utils';
const IS_MAC = process.platform === 'darwin';
async function keyDownCtrlOrMeta(page) {
    if (IS_MAC) {
        await page.keyboard.down('Meta');
    }
    else {
        await page.keyboard.down('Control');
    }
}
async function keyUpCtrlOrMeta(page) {
    if (IS_MAC) {
        await page.keyboard.up('Meta');
    }
    else {
        await page.keyboard.up('Control');
    }
}
// It's not good enough, but better than calling keyDownCtrlOrMeta and keyUpCtrlOrMeta separately
export const withCtrlOrMeta = async (page, fn) => {
    await keyDownCtrlOrMeta(page);
    await fn();
    await keyUpCtrlOrMeta(page);
};
export async function pressEnter(page, count = 1) {
    // avoid flaky test by simulate real user input
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Enter', { delay: 50 });
    }
}
export async function pressArrowUp(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowUp', { delay: 50 });
    }
}
export async function pressArrowDown(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowDown', { delay: 20 });
    }
}
export async function pressTab(page) {
    await page.keyboard.press('Tab', { delay: 50 });
}
export async function pressShiftTab(page) {
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab', { delay: 50 });
    await page.keyboard.up('Shift');
}
export async function pressShiftEnter(page) {
    await page.keyboard.down('Shift');
    await page.keyboard.press('Enter', { delay: 50 });
    await page.keyboard.up('Shift');
}
export async function pressBackspace(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Backspace', { delay: 50 });
    }
}
export async function pressEscape(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Escape', { delay: 50 });
    }
}
export async function copyByKeyboard(page) {
    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('c', { delay: 50 });
    await keyUpCtrlOrMeta(page);
}
export async function cutByKeyboard(page) {
    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('x', { delay: 50 });
    await keyUpCtrlOrMeta(page);
}
export async function pasteByKeyboard(page) {
    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('v', { delay: 50 });
    await keyUpCtrlOrMeta(page);
}
export async function selectAllByKeyboard(page) {
    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('a', { delay: 50 });
    await keyUpCtrlOrMeta(page);
}
export async function undoByKeyboard(page) {
    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('z', { delay: 50 });
    await keyUpCtrlOrMeta(page);
}
const clipboardMutex = new AsyncLock();
export async function writeTextToClipboard(page, text, paste = true) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const _release = __addDisposableResource(env_1, await clipboardMutex.acquire(), false);
        // paste the url
        await page.evaluate(async ([text]) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            navigator.clipboard.writeText('');
            const e = new ClipboardEvent('paste', {
                clipboardData: new DataTransfer(),
            });
            Object.defineProperty(e, 'target', {
                writable: false,
                value: document,
            });
            e.clipboardData.setData('text/plain', text);
            document.dispatchEvent(e);
        }, [text]);
        if (paste) {
            await keyDownCtrlOrMeta(page);
            await page.keyboard.press('v', { delay: 50 });
            await keyUpCtrlOrMeta(page);
        }
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
//# sourceMappingURL=keyboard.js.map