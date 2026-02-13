import { builtInTemplates as builtInEdgelessTemplates } from '@affine/templates/edgeless';
import { builtInTemplates as builtInStickersTemplates } from '@affine/templates/stickers';
import { EdgelessTemplatePanel, } from '@blocksuite/affine/gfx/template';
export function registerTemplates() {
    EdgelessTemplatePanel.templates.extend(builtInStickersTemplates);
    EdgelessTemplatePanel.templates.extend(builtInEdgelessTemplates);
}
//# sourceMappingURL=register-templates.js.map