import { AIViewExtension } from '@affine/core/blocksuite/view-extensions/ai';
import { CloudViewExtension } from '@affine/core/blocksuite/view-extensions/cloud';
import { CodeBlockPreviewViewExtension } from '@affine/core/blocksuite/view-extensions/code-block-preview';
import { CommentViewExtension } from '@affine/core/blocksuite/view-extensions/comment';
import { AffineDatabaseViewExtension } from '@affine/core/blocksuite/view-extensions/database';
import { EdgelessBlockHeaderConfigViewExtension, } from '@affine/core/blocksuite/view-extensions/edgeless-block-header';
import { AffineEditorConfigViewExtension } from '@affine/core/blocksuite/view-extensions/editor-config';
import { createDatabaseOptionsConfig } from '@affine/core/blocksuite/view-extensions/editor-config/database';
import { createLinkedWidgetConfig } from '@affine/core/blocksuite/view-extensions/editor-config/linked';
import { AffineEditorViewExtension, } from '@affine/core/blocksuite/view-extensions/editor-view/editor-view';
import { ElectronViewExtension } from '@affine/core/blocksuite/view-extensions/electron';
import { AffineIconPickerExtension } from '@affine/core/blocksuite/view-extensions/icon-picker';
import { AffineLinkPreviewExtension } from '@affine/core/blocksuite/view-extensions/link-preview-service';
import { MobileViewExtension } from '@affine/core/blocksuite/view-extensions/mobile';
import { PdfViewExtension } from '@affine/core/blocksuite/view-extensions/pdf';
import { AffineThemeViewExtension } from '@affine/core/blocksuite/view-extensions/theme';
import { TurboRendererViewExtension } from '@affine/core/blocksuite/view-extensions/turbo-renderer';
import { PeekViewService } from '@affine/core/modules/peek-view';
import { DebugLogger } from '@affine/debug';
import { mixpanel } from '@affine/track';
import { DatabaseViewExtension } from '@blocksuite/affine/blocks/database/view';
import { ParagraphViewExtension } from '@blocksuite/affine/blocks/paragraph/view';
import { ViewExtensionManager } from '@blocksuite/affine/ext-loader';
import { getInternalViewExtensions } from '@blocksuite/affine/extensions/view';
import { FoundationViewExtension } from '@blocksuite/affine/foundation/view';
import { InlineCommentViewExtension } from '@blocksuite/affine/inlines/comment';
import { AffineCanvasTextFonts } from '@blocksuite/affine/shared/services';
import { LinkedDocViewExtension } from '@blocksuite/affine/widgets/linked-doc/view';
const peekViewLogger = new DebugLogger('affine::patch-peek-view-service');
class ViewProvider {
    static { this.instance = null; }
    static getInstance() {
        if (!ViewProvider.instance) {
            ViewProvider.instance = new ViewProvider();
        }
        return ViewProvider.instance;
    }
    constructor() {
        this._initDefaultConfig = () => {
            this.config
                .foundation()
                .theme()
                .editorView()
                .editorConfig()
                .edgelessBlockHeader()
                .database()
                .linkedDoc()
                .paragraph()
                .cloud()
                .turboRenderer()
                .pdf()
                .mobile()
                .ai()
                .electron()
                .linkPreview()
                .codeBlockPreview()
                .iconPicker()
                .comment();
            return this.config;
        };
        this._configureFoundation = (framework) => {
            const peekViewService = framework?.get(PeekViewService);
            this._manager.configure(FoundationViewExtension, {
                telemetry: {
                    track: (eventName, props) => {
                        mixpanel.track(eventName, props);
                    },
                },
                fontConfig: AffineCanvasTextFonts.map(font => ({
                    ...font,
                    url: environment.publicPath + 'fonts/' + font.url.split('/').pop(),
                })),
                peekView: !peekViewService
                    ? undefined
                    : {
                        peek: (element, options) => {
                            peekViewLogger.debug('center peek', element);
                            const { template, target, ...props } = element;
                            return peekViewService.peekView.open({
                                element: target,
                                docRef: props,
                            }, template, options?.abortSignal);
                        },
                    },
            });
            return this.config;
        };
        this._configureEditorView = (options) => {
            this._manager.configure(AffineEditorViewExtension, options);
            return this.config;
        };
        this._configureTheme = (framework) => {
            this._manager.configure(AffineThemeViewExtension, { framework });
            return this.config;
        };
        this._configureEditorConfig = (framework) => {
            this._manager.configure(AffineEditorConfigViewExtension, { framework });
            return this.config;
        };
        this._configureEdgelessBlockHeader = (options) => {
            this._manager.configure(EdgelessBlockHeaderConfigViewExtension, options);
            return this.config;
        };
        this._configureDatabase = (framework) => {
            if (framework) {
                this._manager.configure(DatabaseViewExtension, createDatabaseOptionsConfig(framework));
            }
            return this.config;
        };
        this._configureLinkedDoc = (framework) => {
            if (framework) {
                this._manager.configure(LinkedDocViewExtension, createLinkedWidgetConfig(framework));
            }
            return this.config;
        };
        this._configureParagraph = (enableAI) => {
            if (BUILD_CONFIG.isMobileEdition) {
                this._manager.configure(ParagraphViewExtension, {
                    getPlaceholder: model => {
                        const placeholders = {
                            text: '',
                            h1: 'Heading 1',
                            h2: 'Heading 2',
                            h3: 'Heading 3',
                            h4: 'Heading 4',
                            h5: 'Heading 5',
                            h6: 'Heading 6',
                            quote: '',
                        };
                        return placeholders[model.props.type] ?? '';
                    },
                });
            }
            else if (enableAI) {
                this._manager.configure(ParagraphViewExtension, {
                    getPlaceholder: model => {
                        const placeholders = {
                            text: "Type '/' for commands, 'space' for AI",
                            h1: 'Heading 1',
                            h2: 'Heading 2',
                            h3: 'Heading 3',
                            h4: 'Heading 4',
                            h5: 'Heading 5',
                            h6: 'Heading 6',
                            quote: '',
                        };
                        return placeholders[model.props.type] ?? '';
                    },
                });
            }
            return this.config;
        };
        this._configureCloud = (framework, enableCloud) => {
            this._manager.configure(CloudViewExtension, { framework, enableCloud });
            return this.config;
        };
        this._configureTurboRenderer = (enableTurboRenderer) => {
            this._manager.configure(TurboRendererViewExtension, {
                enableTurboRenderer,
            });
            return this.config;
        };
        this._configurePdf = (enablePDFEmbedPreview, reactToLit) => {
            this._manager.configure(PdfViewExtension, {
                enablePDFEmbedPreview,
                reactToLit,
            });
            return this.config;
        };
        this._configureMobile = (framework) => {
            this._manager.configure(MobileViewExtension, { framework });
            return this.config;
        };
        this._configureAI = (enable, framework) => {
            this._manager.configure(AIViewExtension, { framework, enable });
            return this.config;
        };
        this._configureElectron = (framework) => {
            this._manager.configure(ElectronViewExtension, { framework });
            return this.config;
        };
        this._configureLinkPreview = (framework) => {
            this._manager.configure(AffineLinkPreviewExtension, { framework });
            return this.config;
        };
        this._configureCodeBlockHtmlPreview = (framework) => {
            this._manager.configure(CodeBlockPreviewViewExtension, { framework });
            return this.config;
        };
        this._configureIconPicker = (framework) => {
            this._manager.configure(AffineIconPickerExtension, { framework });
            return this.config;
        };
        this._configureComment = (enableComment, framework) => {
            this._manager.configure(CommentViewExtension, {
                enableComment,
                framework,
            });
            this._manager.configure(InlineCommentViewExtension, {
                enabled: enableComment,
            });
            return this.config;
        };
        this._manager = new ViewExtensionManager([
            ...getInternalViewExtensions(),
            AffineThemeViewExtension,
            AffineEditorViewExtension,
            AffineEditorConfigViewExtension,
            AffineIconPickerExtension,
            CodeBlockPreviewViewExtension,
            EdgelessBlockHeaderConfigViewExtension,
            TurboRendererViewExtension,
            CloudViewExtension,
            PdfViewExtension,
            MobileViewExtension,
            AIViewExtension,
            ElectronViewExtension,
            AffineLinkPreviewExtension,
            AffineDatabaseViewExtension,
            CommentViewExtension,
        ]);
    }
    get value() {
        return this._manager;
    }
    get config() {
        return {
            init: this._initDefaultConfig,
            foundation: this._configureFoundation,
            editorView: this._configureEditorView,
            theme: this._configureTheme,
            editorConfig: this._configureEditorConfig,
            edgelessBlockHeader: this._configureEdgelessBlockHeader,
            database: this._configureDatabase,
            linkedDoc: this._configureLinkedDoc,
            paragraph: this._configureParagraph,
            cloud: this._configureCloud,
            turboRenderer: this._configureTurboRenderer,
            pdf: this._configurePdf,
            mobile: this._configureMobile,
            ai: this._configureAI,
            electron: this._configureElectron,
            linkPreview: this._configureLinkPreview,
            codeBlockPreview: this._configureCodeBlockHtmlPreview,
            iconPicker: this._configureIconPicker,
            comment: this._configureComment,
            value: this._manager,
        };
    }
}
export function getViewManager() {
    return ViewProvider.getInstance();
}
//# sourceMappingURL=view.js.map