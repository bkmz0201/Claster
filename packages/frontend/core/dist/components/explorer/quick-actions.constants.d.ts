import type { I18nString } from '@affine/i18n';
import { type QuickActionProps } from './docs-view/quick-actions';
import type { ExplorerDisplayPreference } from './types';
type ExtractPrefixKeys<Obj extends object, Prefix extends string> = {
    [Key in keyof Obj]-?: Key extends `${Prefix}${string}` ? Key : never;
}[keyof Obj];
export type QuickActionKey = ExtractPrefixKeys<ExplorerDisplayPreference, 'quick'>;
export declare const quickActions: {
    name: I18nString;
    Component: React.FC<QuickActionProps>;
    disabled?: boolean;
    key: QuickActionKey;
}[];
export type QuickAction = (typeof quickActions)[number];
export {};
//# sourceMappingURL=quick-actions.constants.d.ts.map