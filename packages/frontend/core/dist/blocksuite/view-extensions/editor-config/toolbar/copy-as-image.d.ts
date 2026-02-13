import type { MenuContext } from '@blocksuite/affine/components/toolbar';
import type { BlockStdScope } from '@blocksuite/affine/std';
import type { FrameworkProvider } from '@toeverything/infra';
export declare function copyAsImage(std: BlockStdScope): void;
export declare function createCopyAsPngMenuItem(framework: FrameworkProvider): {
    icon: import("lit-html").TemplateResult<1>;
    label: string;
    type: string;
    when: (ctx: MenuContext) => boolean;
    action: (ctx: MenuContext) => void;
};
//# sourceMappingURL=copy-as-image.d.ts.map