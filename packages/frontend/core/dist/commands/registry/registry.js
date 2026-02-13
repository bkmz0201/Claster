import { DebugLogger } from '@affine/debug';
// @ts-expect-error upstream type is wrong
import { createKeybindingsHandler } from 'tinykeys';
import { createAffineCommand } from './command';
const commandLogger = new DebugLogger('command:registry');
const bindKeys = (target, keyBindingMap, options = {}) => {
    const event = options.event ?? 'keydown';
    const onKeyEvent = createKeybindingsHandler(keyBindingMap, options);
    target.addEventListener(event, onKeyEvent, options.capture);
    return () => {
        target.removeEventListener(event, onKeyEvent, options.capture);
    };
};
export const AffineCommandRegistry = new (class {
    constructor() {
        this.commands = new Map();
    }
    register(options) {
        if (this.commands.has(options.id)) {
            commandLogger.warn(`Command ${options.id} already registered.`);
            return () => { };
        }
        const command = createAffineCommand(options);
        this.commands.set(command.id, command);
        let unsubKb;
        if (command.keyBinding &&
            !command.keyBinding.skipRegister &&
            typeof window !== 'undefined') {
            const { binding: keybinding, capture } = command.keyBinding;
            unsubKb = bindKeys(window, {
                [keybinding]: (e) => {
                    e.preventDefault();
                    command.run()?.catch(e => {
                        console.error(`Failed to run command [${command.id}]`, e);
                    });
                },
            }, {
                capture,
            });
        }
        commandLogger.debug(`Registered command ${command.id}`);
        return () => {
            unsubKb?.();
            this.commands.delete(command.id);
            commandLogger.debug(`Unregistered command ${command.id}`);
        };
    }
    get(id) {
        if (!this.commands.has(id)) {
            commandLogger.warn(`Command ${id} not registered.`);
            return undefined;
        }
        return this.commands.get(id);
    }
    getAll() {
        return Array.from(this.commands.values());
    }
})();
export function registerAffineCommand(options) {
    return AffineCommandRegistry.register(options);
}
//# sourceMappingURL=registry.js.map