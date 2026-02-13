import type { AffineCommand, AffineCommandOptions } from './command';
export interface KeyBindingOptions {
    /**
     * Key presses will listen to this event (default: "keydown").
     */
    event?: 'keydown' | 'keyup';
    /**
     * Whether to capture the event during the capture phase (default: false).
     */
    capture?: boolean;
    /**
     * Keybinding sequences will wait this long between key presses before
     * cancelling (default: 1000).
     *
     * **Note:** Setting this value too low (i.e. `300`) will be too fast for many
     * of your users.
     */
    timeout?: number;
}
export declare const AffineCommandRegistry: {
    readonly commands: Map<string, AffineCommand>;
    register(options: AffineCommandOptions): () => void;
    get(id: string): AffineCommand | undefined;
    getAll(): AffineCommand[];
};
export declare function registerAffineCommand(options: AffineCommandOptions): () => void;
//# sourceMappingURL=registry.d.ts.map