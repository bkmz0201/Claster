import { WidgetComponent, WidgetViewExtension } from '@blocksuite/affine/std';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { css, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { literal, unsafeStatic } from 'lit/static-html.js';
import { BlockDiffProvider } from '../../services/block-diff';
import { blockDiffWidgetForPage } from './page';
export const AFFINE_BLOCK_DIFF_WIDGET_FOR_BLOCK = 'affine-block-diff-widget-for-block';
export class AffineBlockDiffWidgetForBlock extends WidgetComponent {
    static { this.styles = css `
    .ai-block-diff {
      position: relative;
      margin-top: 8px;
      margin-bottom: 8px;
      pointer-events: none;
      background-color: ${unsafeCSSVarV2('aI/applyTextHighlightBackground')};
      padding: 8px 0px;
      border-radius: 4px;
    }

    .ai-block-diff.delete {
      position: absolute;
      top: -8px;
      left: 4px;
      width: 100%;
      height: 100%;
      margin: 0;
      background: transparent;
    }
    .ai-block-diff,
    .ai-block-diff.delete,
    .ai-block-diff.update,
    .ai-block-diff.insert {
      pointer-events: auto;
    }
    .diff-options {
      visibility: hidden;
    }
    .ai-block-diff:hover .diff-options,
    .ai-block-diff.delete:hover .diff-options,
    .ai-block-diff.update:hover .diff-options,
    .ai-block-diff.insert:hover .diff-options {
      visibility: visible;
    }
  `; }
    _setDeletedStyle(blockId) {
        const deleted = document.querySelector(`[data-block-id="${blockId}"]`);
        if (!deleted) {
            return;
        }
        deleted.classList.add('ai-block-diff-deleted');
    }
    _clearDeletedStyle(blockId) {
        const block = document.querySelector(`[data-block-id="${blockId}"]`);
        if (!block) {
            return;
        }
        block.classList.remove('ai-block-diff-deleted');
    }
    _renderDelete(blockId) {
        if (this.diffService.isRejected('delete', blockId)) {
            return nothing;
        }
        this._setDeletedStyle(blockId);
        const diffId = `delete-${blockId}`;
        return html `<div class="ai-block-diff delete" data-diff-id=${diffId}>
      <ai-block-diff-options
        class="diff-options"
        .onAccept=${() => this.diffService.accept({ type: 'delete', payload: { id: blockId } }, this.std.store)}
        .onReject=${() => this.diffService.reject({ type: 'delete', payload: { id: blockId } })}
      ></ai-block-diff-options>
    </div>`;
    }
    _renderInsert(from, blocks) {
        return html `${repeat(blocks, block => block.id, (block, offset) => {
            const diffId = `insert-${block.id}-${offset}`;
            return this.diffService.isRejected('insert', `${from}:${offset}`)
                ? nothing
                : html `<div class="ai-block-diff insert" data-diff-id=${diffId}>
              <chat-content-rich-text
                .text=${block.content}
                .state="finished"
                .extensions=${this.userExtensions}
                .theme=${this.host.std.get(ThemeProvider).app$}
              ></chat-content-rich-text>
              <ai-block-diff-options
                class="diff-options"
                .onAccept=${() => this.diffService.accept({
                    type: 'insert',
                    payload: { from, offset, content: block.content },
                }, this.std.store)}
                .onReject=${() => this.diffService.reject({
                    type: 'insert',
                    payload: { from, offset },
                })}
              ></ai-block-diff-options>
            </div>`;
        })}`;
    }
    _renderUpdate(blockId, content) {
        if (this.diffService.isRejected('update', blockId)) {
            return nothing;
        }
        const diffId = `update-${blockId}`;
        return html `
      <div class="ai-block-diff update" data-diff-id=${diffId}>
        <chat-content-rich-text
          .text=${content}
          .state="finished"
          .extensions=${this.userExtensions}
          .theme=${this.host.std.get(ThemeProvider).app$}
        ></chat-content-rich-text>
        <ai-block-diff-options
          class="diff-options"
          .onAccept=${() => this.diffService.accept({
            type: 'update',
            payload: { id: blockId, content },
        }, this.std.store)}
          .onReject=${() => this.diffService.reject({
            type: 'update',
            payload: { id: blockId },
        })}
        ></ai-block-diff-options>
      </div>
    `;
    }
    get diffService() {
        return this.std.get(BlockDiffProvider);
    }
    get userExtensions() {
        return this.std.userExtensions.filter(extension => extension !== blockDiffWidgetForPage);
    }
    get blockIndex() {
        const attached = this.block?.blockId;
        if (!attached) {
            return -1;
        }
        return this.diffService.getBlockIndexById(this.std.store, attached);
    }
    render() {
        const attached = this.block?.blockId;
        const service = this.std.get(BlockDiffProvider);
        const blockIndex = this.blockIndex;
        if (attached) {
            this._clearDeletedStyle(attached);
        }
        if (!attached || blockIndex < 0 || !service.hasDiff()) {
            return nothing;
        }
        const diffMap = service.getDiff();
        const { deletes, inserts, updates } = diffMap;
        let deleteDiff = nothing;
        let updateDiff = nothing;
        let insertDiff = nothing;
        if (deletes.includes(attached)) {
            deleteDiff = this._renderDelete(attached);
        }
        if (updates[attached]) {
            updateDiff = this._renderUpdate(attached, updates[attached]);
        }
        if (inserts[attached]) {
            const blocks = inserts[attached];
            insertDiff = this._renderInsert(attached, blocks);
        }
        return html `${deleteDiff} ${updateDiff} ${insertDiff}`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.disposables.add(this.diffService.diffMap$.subscribe(() => {
            this.requestUpdate();
        }));
        this.disposables.add(this.diffService.rejects$.subscribe(() => {
            this.requestUpdate();
        }));
    }
}
export const blockDiffWidgetForBlock = WidgetViewExtension('affine:note/*', AFFINE_BLOCK_DIFF_WIDGET_FOR_BLOCK, literal `${unsafeStatic(AFFINE_BLOCK_DIFF_WIDGET_FOR_BLOCK)}`);
//# sourceMappingURL=block.js.map