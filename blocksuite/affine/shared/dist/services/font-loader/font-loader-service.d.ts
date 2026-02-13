import { LifeCycleWatcher } from '@blocksuite/std';
import type { ExtensionType } from '@blocksuite/store';
import type { FontConfig } from './config.js';
export declare class FontLoaderService extends LifeCycleWatcher {
    static readonly key = "font-loader";
    readonly fontFaces: FontFace[];
    get ready(): Promise<FontFace[]>;
    load(fonts: FontConfig[]): void;
    mounted(): void;
    unmounted(): void;
}
export declare const FontConfigIdentifier: import("@blocksuite/global/di").ServiceIdentifier<{
    style: string;
    font: string;
    url: string;
    weight: string;
}[]> & (<U extends {
    style: string;
    font: string;
    url: string;
    weight: string;
}[] = {
    style: string;
    font: string;
    url: string;
    weight: string;
}[]>(variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<U>);
export declare const FontConfigExtension: (fontConfig: FontConfig[]) => ExtensionType;
//# sourceMappingURL=font-loader-service.d.ts.map