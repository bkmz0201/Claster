import type { Observable } from 'rxjs';
export interface EditorSettingProvider {
    set(key: string, value: string): void;
    watchAll(): Observable<Record<string, string>>;
}
export declare const EditorSettingProvider: import("@toeverything/infra").Identifier<EditorSettingProvider> & ((variant: string) => import("@toeverything/infra").Identifier<EditorSettingProvider>);
//# sourceMappingURL=editor-setting-provider.d.ts.map