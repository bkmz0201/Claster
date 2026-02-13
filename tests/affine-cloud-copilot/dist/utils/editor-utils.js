import { createEdgelessNoteBlock, setEdgelessTool, } from '@affine-test/kit/utils/editor';
import { pressEscape, selectAllByKeyboard, } from '@affine-test/kit/utils/keyboard';
import { clickNewPageButton, getBlockSuiteEditorTitle, } from '@affine-test/kit/utils/page-logic';
import {} from '@playwright/test';
export class EditorUtils {
    static async focusToEditor(page) {
        const title = getBlockSuiteEditorTitle(page);
        await title.focus();
        await page.keyboard.press('Enter');
    }
    static async getEditorContent(page, trim = true) {
        let content = '';
        let retry = 3;
        while (!content && retry > 0) {
            const lines = await page.$$('page-editor .inline-editor');
            const contents = await Promise.all(lines.map(el => el.innerText()));
            content = contents
                .map(c => {
                const invisibleFiltered = c.replace(/[\u200B-\u200D\uFEFF]/g, '');
                if (trim) {
                    return invisibleFiltered.trim();
                }
                return invisibleFiltered;
            })
                .filter(c => !!c)
                .join('\n');
            if (!content) {
                await page.waitForTimeout(500);
                retry -= 1;
            }
        }
        return content;
    }
    static async getNoteContent(page) {
        const edgelessNode = await page.waitForSelector('affine-edgeless-note .edgeless-note-page-content');
        return (await edgelessNode.innerText())
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .trim();
    }
    static async switchToEdgelessMode(page) {
        const editor = await page.waitForSelector('page-editor');
        await page.getByTestId('switch-edgeless-mode-button').click();
        await editor.waitForElementState('hidden');
        await page.waitForSelector('edgeless-editor');
    }
    static async switchToPageMode(page) {
        await page.getByTestId('switch-page-mode-button').click();
        await page.waitForSelector('page-editor');
    }
    static async isPageMode(page) {
        return await page.waitForSelector('page-editor');
    }
    static async isEdgelessMode(page) {
        return await page.waitForSelector('edgeless-editor');
    }
    static async getDocTitle(page) {
        return page.getByTestId('title-edit-button').innerText();
    }
    static async waitForAiAnswer(page) {
        const answer = await page.getByTestId('ai-penel-answer');
        await answer.waitFor({
            state: 'visible',
            timeout: 2 * 60000,
        });
        return answer;
    }
    static createAction(page, action) {
        return async () => {
            await action();
            const responses = new Set();
            const answer = await this.waitForAiAnswer(page);
            const responsesMenu = answer.getByTestId('answer-responses');
            await responsesMenu.isVisible();
            await responsesMenu.scrollIntoViewIfNeeded({ timeout: 60000 });
            await responsesMenu
                .getByTestId('answer-insert-below-loading')
                .waitFor({ state: 'hidden' });
            if (await responsesMenu.getByTestId('answer-insert-below').isVisible()) {
                responses.add('insert-below');
            }
            if (await responsesMenu.getByTestId('answer-insert-above').isVisible()) {
                responses.add('insert-above');
            }
            if (await responsesMenu.getByTestId('answer-replace').isVisible()) {
                responses.add('replace-selection');
            }
            if (await responsesMenu.getByTestId('answer-use-as-caption').isVisible()) {
                responses.add('use-as-caption');
            }
            if (await responsesMenu.getByTestId('answer-create-new-note').isVisible()) {
                responses.add('create-new-note');
            }
            return {
                answer: await this.waitForAiAnswer(page),
                responses,
            };
        };
    }
    static async createEdgelessText(page, text) {
        await setEdgelessTool(page, 'text');
        await page.mouse.click(400, 400);
        await page.locator('affine-edgeless-text').waitFor({ state: 'visible' });
        await page.waitForTimeout(100);
        const texts = text.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
    }
    static async createEdgelessNote(page, text) {
        await createEdgelessNoteBlock(page, [500, 300]);
        const texts = text.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
    }
    static async createMindmap(page) {
        await page.keyboard.press('m');
        await page.mouse.click(400, 400);
        const id = await page.evaluate(() => {
            const edgelessBlock = document.querySelector('affine-edgeless-root');
            if (!edgelessBlock) {
                throw new Error('edgeless block not found');
            }
            const mindmaps = edgelessBlock.gfx.gfxElements.filter((el) => 'type' in el && el.type === 'mindmap');
            return mindmaps[mindmaps.length - 1].id;
        });
        return id;
    }
    static async createShape(page, text) {
        // Create shape
        await page.keyboard.press('s');
        await page.mouse.click(400, 400);
        const id = await page.evaluate(() => {
            const edgelessBlock = document.querySelector('affine-edgeless-root');
            if (!edgelessBlock) {
                throw new Error('edgeless block not found');
            }
            const shapes = edgelessBlock.gfx.gfxElements.filter((el) => 'type' in el && el.type === 'shape');
            return shapes[shapes.length - 1].id;
        });
        // Insert text inside shape
        await page.mouse.dblclick(450, 450);
        await page.keyboard.insertText(text);
        // Prevent the shape from being dragged
        await page.mouse.click(500, 500);
        return id;
    }
    static async getMindMapNode(page, mindmapId, path) {
        return page.evaluate(({ mindmapId, path }) => {
            const edgelessBlock = document.querySelector('affine-edgeless-root');
            if (!edgelessBlock) {
                throw new Error('edgeless block not found');
            }
            const mindmap = edgelessBlock.gfx.getElementById(mindmapId);
            if (!mindmap) {
                throw new Error(`Mindmap not found: ${mindmapId}`);
            }
            const node = mindmap.getNodeByPath(path);
            if (!node) {
                throw new Error(`Mindmap node not found at: ${path}`);
            }
            const rect = edgelessBlock.gfx.viewport.toViewBound(node.element.elementBound);
            return {
                path: mindmap.getPath(node),
                id: node.id,
                text: node.element.text?.toString() ?? '',
                rect: {
                    x: rect.x,
                    y: rect.y,
                    w: rect.w,
                    h: rect.h,
                },
            };
        }, {
            mindmapId,
            path,
        });
    }
    static async clearAllCollections(page) {
        while (true) {
            const collection = await page
                .getByTestId('navigation-panel-collections')
                .locator('[data-testid^="navigation-panel-collection-"]')
                .first();
            if (!(await collection.isVisible())) {
                break;
            }
            const collectionContent = await collection.locator('div').first();
            await collectionContent.hover();
            const more = await collectionContent.getByTestId('navigation-panel-tree-node-operation-button');
            await more.click();
            await page.getByTestId('collection-delete-button').click();
        }
        await page.waitForTimeout(100);
    }
    static async clearAllTags(page) {
        while (true) {
            const tag = await page
                .getByTestId('navigation-panel-tags')
                .locator('[data-testid^="navigation-panel-tag-"]')
                .first();
            if (!(await tag.isVisible())) {
                break;
            }
            const tagContent = await tag.locator('div').first();
            await tagContent.hover();
            const more = await tagContent.getByTestId('navigation-panel-tree-node-operation-button');
            await more.click();
            await page.getByTestId('tag-delete-button').click();
        }
        await page.waitForTimeout(100);
    }
    static async createDoc(page, title, docContent) {
        await clickNewPageButton(page);
        await page.keyboard.insertText(title);
        await this.focusToEditor(page);
        const texts = docContent.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
    }
    static async createCollectionAndDoc(page, collectionName, docContent) {
        // Create collection
        await page
            .getByTestId('navigation-panel-bar-add-collection-button')
            .click();
        const input = await page.getByTestId('prompt-modal-input');
        await input.focus();
        await input.pressSequentially(collectionName);
        await page.getByTestId('prompt-modal-confirm').click();
        const collections = await page.getByTestId('collapsible-section-content');
        const collection = await collections
            .getByText(collectionName)
            .locator('..');
        // Create doc
        await collection.hover();
        await collection.getByTestId('collection-add-doc-button').click();
        await page.getByTestId('confirm-modal-confirm').click();
        await this.focusToEditor(page);
        const texts = docContent.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
        // sleep 1 sec to wait the doc sync
        await page.waitForTimeout(1000);
    }
    static async createTagAndDoc(page, tagName, docContent) {
        // Create tag
        const tags = await page.getByTestId('navigation-panel-tags');
        await tags.hover();
        await tags.getByTestId('navigation-panel-bar-add-tag-button').click();
        const input = await page.getByTestId('rename-modal-input');
        await input.focus();
        await input.pressSequentially(tagName);
        await input.press('Enter');
        const tag = await tags.getByText(tagName).locator('..');
        // Create doc
        await tag.hover();
        await tag.getByTestId('tag-add-doc-button').click();
        await this.focusToEditor(page);
        const texts = docContent.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
        // sleep 1 sec to wait the doc sync
        await page.waitForTimeout(1000);
    }
    static async selectElementInEdgeless(page, elements) {
        await page.evaluate(({ elements }) => {
            const edgelessBlock = document.querySelector('affine-edgeless-root');
            if (!edgelessBlock) {
                throw new Error('edgeless block not found');
            }
            edgelessBlock.gfx.selection.set({
                elements,
            });
        }, { elements });
    }
    static async removeAll(page) {
        await selectAllByKeyboard(page);
        await page.keyboard.press('Delete');
    }
    static async askAIWithEdgeless(page, createBlock, afterSelected) {
        await this.switchToEdgelessMode(page);
        await this.removeAll(page);
        await createBlock();
        await pressEscape(page, 5);
        await selectAllByKeyboard(page);
        await afterSelected?.();
        await page.getByTestId('ask-ai-button').click();
        return {
            aiImageFilter: this.createAction(page, () => page.getByTestId('action-ai-image-filter').click()),
            brainstorm: this.createAction(page, () => page.getByTestId('action-brainstorm').click()),
            brainstormMindMap: this.createAction(page, () => page.getByTestId('action-brainstorm-mindmap').click()),
            changeTone: (tone) => this.createAction(page, async () => {
                await page.getByTestId('action-change-tone').hover();
                await page.getByTestId(`action-change-tone-${tone}`).click();
            })(),
            checkCodeError: this.createAction(page, () => page.getByTestId('action-check-code-error').click()),
            continueWithAi: () => page.getByTestId('action-continue-with-ai').click(),
            continueWriting: this.createAction(page, () => page.getByTestId('action-continue-writing').click()),
            createHeadings: this.createAction(page, () => page.getByTestId('action-create-headings').click()),
            explainSelection: this.createAction(page, () => page.getByTestId('action-explain-selection').click()),
            findActions: this.createAction(page, () => page.getByTestId('action-find-actions').click()),
            fixGrammar: this.createAction(page, () => page.getByTestId('action-fix-grammar').click()),
            fixSpelling: this.createAction(page, () => page.getByTestId('action-fix-spelling').click()),
            generateCaption: this.createAction(page, () => page.getByTestId('action-generate-caption').click()),
            generateHeadings: this.createAction(page, () => page.getByTestId('action-generate-headings').click()),
            generateImage: this.createAction(page, () => page.getByTestId('action-generate-image').click()),
            generateOutline: this.createAction(page, () => page.getByTestId('action-generate-outline').click()),
            generatePresentation: this.createAction(page, () => page.getByTestId('action-generate-presentation').click()),
            imageProcessing: this.createAction(page, () => page.getByTestId('action-image-processing').click()),
            improveGrammar: this.createAction(page, () => page.getByTestId('action-improve-grammar').click()),
            improveWriting: this.createAction(page, () => page.getByTestId('action-improve-writing').click()),
            makeItLonger: this.createAction(page, () => page.getByTestId('action-make-it-longer').click()),
            makeItReal: this.createAction(page, () => page.getByTestId('action-make-it-real').click()),
            makeItShorter: this.createAction(page, () => page.getByTestId('action-make-it-shorter').click()),
            summarize: this.createAction(page, () => page.getByTestId('action-summarize').click()),
            translate: (language) => this.createAction(page, async () => {
                await page.getByTestId('action-translate').hover();
                await page.getByTestId(`action-translate-${language}`).click();
            })(),
            writeArticle: this.createAction(page, () => page.getByTestId('action-write-article').click()),
            writeBlogPost: this.createAction(page, () => page.getByTestId('action-write-blog-post').click()),
            writePoem: this.createAction(page, () => page.getByTestId('action-write-poem').click()),
            writeTwitterPost: this.createAction(page, () => page.getByTestId('action-write-twitter-post').click()),
            regenerateMindMap: this.createAction(page, () => page.getByTestId('action-regenerate-mindmap').click()),
            expandMindMapNode: async () => page.getByTestId('action-expand-mindmap-node').click(),
        };
    }
    static async askAIWithCode(page, code, language) {
        await this.focusToEditor(page);
        await page.keyboard.insertText(`\`\`\`${language}`);
        await page.keyboard.press('Enter');
        await page.keyboard.insertText(code);
        await page.locator('affine-code').blur();
        await page.locator('affine-code').hover();
        await page.getByTestId('ask-ai-button').click();
        return {
            explainCode: this.createAction(page, () => page.getByTestId('action-explain-code').click()),
            checkCodeError: this.createAction(page, () => page.getByTestId('action-check-code-error').click()),
        };
    }
    static async askAIWithImage(page, image) {
        await page.evaluate(() => {
            delete window.showOpenFilePicker;
        });
        const fileChooserPromise = page.waitForEvent('filechooser');
        await this.focusToEditor(page);
        await page.keyboard.press('/');
        await page.keyboard.insertText('image');
        await page.locator('affine-slash-menu').getByTestId('Image').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(image);
        await page.locator('affine-page-image').click();
        await page.getByTestId('ask-ai-button').click();
        return {
            explainImage: this.createAction(page, () => page.getByTestId('action-explain-image').click()),
            generateImage: this.createAction(page, async () => {
                await page.getByTestId('action-generate-image').click();
                await page.keyboard.type('generate an image');
                await page.getByTestId('ai-panel-input-send').click();
            }),
            generateCaption: this.createAction(page, () => page.getByTestId('action-generate-caption').click()),
            imageProcessing: (type) => this.createAction(page, async () => {
                await page.getByTestId('action-image-processing').hover();
                await page.getByTestId(`action-image-processing-${type}`).click();
            })(),
            imageFilter: (style) => this.createAction(page, async () => {
                await page.getByTestId('action-ai-image-filter').hover();
                await page.getByTestId(`action-image-filter-${style}`).click();
            })(),
        };
    }
    static async showAIMenu(page) {
        const askAI = await page.locator('page-editor editor-toolbar ask-ai-icon');
        await askAI.waitFor({
            state: 'attached',
            timeout: 5000,
        });
        await askAI.click();
        return {
            aiImageFilter: this.createAction(page, () => page.getByTestId('action-ai-image-filter').click()),
            brainstorm: this.createAction(page, () => page.getByTestId('action-brainstorm').click()),
            brainstormMindMap: this.createAction(page, () => page.getByTestId('action-brainstorm-mindmap').click()),
            changeTone: (tone) => this.createAction(page, async () => {
                await page.getByTestId('action-change-tone').hover();
                await page.getByTestId(`action-change-tone-${tone}`).click();
            })(),
            checkCodeError: this.createAction(page, () => page.getByTestId('action-check-code-error').click()),
            continueWithAi: () => page.getByTestId('action-continue-with-ai').click(),
            continueWriting: this.createAction(page, () => page.getByTestId('action-continue-writing').click()),
            createHeadings: this.createAction(page, () => page.getByTestId('action-create-headings').click()),
            explainSelection: this.createAction(page, () => page.getByTestId('action-explain-selection').click()),
            findActions: this.createAction(page, () => page.getByTestId('action-find-actions').click()),
            fixGrammar: this.createAction(page, () => page.getByTestId('action-fix-grammar').click()),
            fixSpelling: this.createAction(page, () => page.getByTestId('action-fix-spelling').click()),
            generateCaption: this.createAction(page, () => page.getByTestId('action-generate-caption').click()),
            generateHeadings: this.createAction(page, () => page.getByTestId('action-generate-headings').click()),
            generateImage: this.createAction(page, () => page.getByTestId('action-generate-image').click()),
            generateOutline: this.createAction(page, () => page.getByTestId('action-generate-outline').click()),
            generatePresentation: this.createAction(page, () => page.getByTestId('action-generate-presentation').click()),
            imageProcessing: this.createAction(page, () => page.getByTestId('action-image-processing').click()),
            improveGrammar: this.createAction(page, () => page.getByTestId('action-improve-grammar').click()),
            improveWriting: this.createAction(page, () => page.getByTestId('action-improve-writing').click()),
            makeItLonger: this.createAction(page, () => page.getByTestId('action-make-it-longer').click()),
            makeItReal: this.createAction(page, () => page.getByTestId('action-make-it-real').click()),
            makeItShorter: this.createAction(page, () => page.getByTestId('action-make-it-shorter').click()),
            summarize: this.createAction(page, () => page.getByTestId('action-summarize').click()),
            translate: (language) => this.createAction(page, async () => {
                await page.getByTestId('action-translate').hover();
                await page.getByTestId(`action-translate-${language}`).click();
            })(),
            writeArticle: this.createAction(page, () => page.getByTestId('action-write-article').click()),
            writeBlogPost: this.createAction(page, () => page.getByTestId('action-write-blog-post').click()),
            writePoem: this.createAction(page, () => page.getByTestId('action-write-poem').click()),
            writeTwitterPost: this.createAction(page, () => page.getByTestId('action-write-twitter-post').click()),
        };
    }
    static async askAIWithText(page, text) {
        await this.focusToEditor(page);
        const texts = text.split('\n');
        for (const [index, line] of texts.entries()) {
            await page.keyboard.insertText(line);
            if (index !== texts.length - 1) {
                await page.keyboard.press('Enter');
            }
        }
        await page.keyboard.press('ControlOrMeta+A');
        await page.keyboard.press('ControlOrMeta+A');
        await page.keyboard.press('ControlOrMeta+A');
        return await this.showAIMenu(page);
    }
    static async whatAreYourThoughts(page, text) {
        const textarea = page.locator('affine-ai-panel-widget .ai-panel-container textarea');
        await textarea.fill(text);
        return textarea;
    }
}
//# sourceMappingURL=editor-utils.js.map