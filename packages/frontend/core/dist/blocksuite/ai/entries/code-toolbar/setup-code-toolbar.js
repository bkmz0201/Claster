import '../../components/ask-ai-button';
import { html } from 'lit';
const AICodeItemGroups = buildAICodeItemGroups();
const buttonOptions = {
    size: 'small',
    panelWidth: 240,
};
import { BlockSelection } from '@blocksuite/affine/std';
import { buildAICodeItemGroups } from '../../_common/config';
export function setupCodeToolbarAIEntry(codeToolbar) {
    codeToolbar.addPrimaryItems([
        {
            type: 'ask-ai',
            when: ({ doc }) => !doc.readonly,
            generate: ({ host, blockComponent }) => {
                return {
                    action: () => {
                        const { selection } = host;
                        selection.setGroup('note', [
                            selection.create(BlockSelection, {
                                blockId: blockComponent.blockId,
                            }),
                        ]);
                    },
                    render: item => html `<ask-ai-button
                class="code-toolbar-button ask-ai"
                .host=${host}
                .actionGroups=${AICodeItemGroups}
                .toggleType=${'click'}
                .options=${buttonOptions}
                @click=${(e) => {
                        e.stopPropagation();
                        item.action();
                    }}
              ></ask-ai-button>`,
                };
            },
        },
    ], 2);
}
//# sourceMappingURL=setup-code-toolbar.js.map