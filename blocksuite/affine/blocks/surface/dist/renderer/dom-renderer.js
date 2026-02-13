import { ColorScheme, } from '@blocksuite/affine-model';
import { FeatureFlagService } from '@blocksuite/affine-shared/services';
import { requestConnectedFrame } from '@blocksuite/affine-shared/utils';
import { DisposableGroup } from '@blocksuite/global/disposable';
import { getBoundWithRotation, intersects, } from '@blocksuite/global/gfx';
import { SurfaceSelection } from '@blocksuite/std';
import { Subject } from 'rxjs';
import { DomElementRendererIdentifier } from './dom-elements/index.js';
const UpdateType = {
    ELEMENT_ADDED: 'element-added',
    ELEMENT_REMOVED: 'element-removed',
    ELEMENT_UPDATED: 'element-updated',
    VIEWPORT_CHANGED: 'viewport-changed',
    SIZE_CHANGED: 'size-changed',
    ZOOM_STATE_CHANGED: 'zoom-state-changed',
};
const PLACEHOLDER_RESET_STYLES = {
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    opacity: '1',
};
function calculatePlaceholderRect(elementModel, viewportBounds, zoom) {
    return {
        transform: elementModel.rotate ? `rotate(${elementModel.rotate}deg)` : '',
        left: `${(elementModel.x - viewportBounds.x) * zoom}px`,
        top: `${(elementModel.y - viewportBounds.y) * zoom}px`,
        width: `${elementModel.w * zoom}px`,
        height: `${elementModel.h * zoom}px`,
    };
}
function calculateFullElementRect(elementModel, viewportBounds, zoom) {
    const dx = elementModel.x - viewportBounds.x;
    const dy = elementModel.y - viewportBounds.y;
    return {
        left: `${dx * zoom}px`,
        top: `${dy * zoom}px`,
    };
}
function getOpacity(elementModel) {
    return { opacity: `${elementModel.opacity ?? 1}` };
}
/**
 * @class DomRenderer
 * Renders surface elements directly to the DOM using HTML elements and CSS.
 *
 * This renderer supports an extension mechanism to handle different types of surface elements.
 * To add rendering support for a new element type (e.g., 'my-custom-element'), follow these steps:
 *
 * 1.  **Define the Renderer Function**:
 *     Create a function that implements the rendering logic for your element.
 *     This function will receive the element's model, the target HTMLElement, and the DomRenderer instance.
 *     Signature: `(model: MyCustomElementModel, domElement: HTMLElement, renderer: DomRenderer) => void;`
 *     Example: `shapeDomRenderer` in `blocksuite/affine/gfx/shape/src/element-renderer/shape-dom/index.ts`.
 *     In this function, you'll apply styles and attributes to the `domElement` based on the `model`.
 *
 * 2.  **Create the Renderer Extension**:
 *     Create a new file (e.g., `my-custom-element-dom-renderer.extension.ts`).
 *     Import `DomElementRendererExtension` (e.g., from `@blocksuite/affine-block-surface` or its source location
 *     `blocksuite/affine/blocks/surface/src/extensions/dom-element-renderer.ts`).
 *     Import your renderer function (from step 1).
 *     Use the factory to create your extension:
 *     `export const MyCustomElementDomRendererExtension = DomElementRendererExtension('my-custom-element', myCustomElementRendererFn);`
 *     Example: `ShapeDomRendererExtension` in `blocksuite/affine/gfx/shape/src/element-renderer/shape-dom.ts`.
 *
 * 3.  **Register the Extension**:
 *     In your application setup where BlockSuite services and view extensions are registered (e.g., a `ViewExtensionProvider`
 *     or a central DI configuration place), import your new extension (from step 2) and register it with the
 *     dependency injection container.
 *     Example: `context.register(MyCustomElementDomRendererExtension);`
 *     As seen with `ShapeDomRendererExtension` being registered in `blocksuite/affine/gfx/shape/src/view.ts`.
 *
 * 4.  **Core Infrastructure (Provided by DomRenderer System)**:
 *     -   `DomElementRenderer` (type): The function signature for renderers, defined in
 *         `blocksuite/affine/blocks/surface/src/renderer/dom-elements/index.ts`.
 *     -   `DomElementRendererIdentifier` (function): Creates unique service identifiers for DI,
 *         used by `DomRenderer` to look up specific renderers. Defined in the same file.
 *     -   `DomElementRendererExtension` (factory): A helper to create extension objects for easy registration.
 *         (e.g., from `@blocksuite/affine-block-surface` or its source).
 *     -   `DomRenderer._renderElement()`: This method automatically looks up the registered renderer using
 *         `DomElementRendererIdentifier(elementType)` and calls it if found.
 *
 * 5.  **Ensure Exports**:
 *     -   The `DomRenderer` class itself should be accessible (e.g., exported from `@blocksuite/affine/blocks/surface`).
 *     -   The `DomElementRendererExtension` factory should be accessible.
 *
 * By following these steps, `DomRenderer` will automatically pick up and use your custom rendering logic
 * when it encounters elements of 'my-custom-element' type.
 */
export class DomRenderer {
    constructor(options) {
        this._disposables = new DisposableGroup();
        this._overlays = new Set();
        this._refreshRafId = null;
        this._sizeUpdatedRafId = null;
        this._updateState = {
            dirtyElementIds: new Set(),
            viewportDirty: false,
            sizeDirty: false,
            usePlaceholderDirty: false,
            pendingUpdates: new Map(),
        };
        this._lastViewportBounds = null;
        this._lastZoom = null;
        this._lastUsePlaceholder = false;
        this._elementsMap = new Map();
        this.usePlaceholder = false;
        this.elementsUpdated = new Subject();
        this.addOverlay = (overlay) => {
            overlay.setRenderer(null);
            this._overlays.add(overlay);
            this.refresh();
        };
        this.attach = (container) => {
            this._container = container;
            container.append(this.rootElement);
            this._resetSize();
            this.refresh();
        };
        this.dispose = () => {
            this._overlays.forEach(overlay => overlay.dispose());
            this._overlays.clear();
            this._disposables.dispose();
            if (this._refreshRafId) {
                cancelAnimationFrame(this._refreshRafId);
                this._refreshRafId = null;
            }
            if (this._sizeUpdatedRafId) {
                cancelAnimationFrame(this._sizeUpdatedRafId);
                this._sizeUpdatedRafId = null;
            }
            this.rootElement.remove();
            this._elementsMap.clear();
        };
        this.generateColorProperty = (color, fallback) => {
            return (this.provider.generateColorProperty?.(color, fallback) ?? 'transparent');
        };
        this.getColorScheme = () => {
            return this.provider.getColorScheme?.() ?? ColorScheme.Light;
        };
        this.getColorValue = (color, fallback, real) => {
            return (this.provider.getColorValue?.(color, fallback, real) ?? 'transparent');
        };
        this.getPropertyValue = (property) => {
            return this.provider.getPropertyValue?.(property) ?? '';
        };
        this.refresh = () => {
            if (this._refreshRafId !== null)
                return;
            this._refreshRafId = requestConnectedFrame(() => {
                this._refreshRafId = null;
                this._render();
            }, this._container);
        };
        this.removeOverlay = (overlay) => {
            if (!this._overlays.has(overlay)) {
                return;
            }
            this._overlays.delete(overlay);
            this.refresh();
        };
        /**
         * Mark a specific element as dirty for incremental updates
         * @param elementId - The ID of the element to mark as dirty
         * @param updateType - The type of update (optional, defaults to ELEMENT_UPDATED)
         */
        this.markElementDirty = (elementId, updateType = UpdateType.ELEMENT_UPDATED) => {
            this._markElementDirty(elementId, updateType);
        };
        /**
         * Force a full re-render of all elements
         */
        this.forceFullRender = () => {
            this._updateState.viewportDirty = true;
            this.refresh();
        };
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('dom-renderer-root');
        this.rootElement.style.pointerEvents = 'none';
        this.std = options.std;
        this.viewport = options.viewport;
        this.layerManager = options.layerManager;
        this.grid = options.gridManager;
        this.provider = options.provider ?? {};
        this._turboEnabled = () => {
            const featureFlagService = options.std.get(FeatureFlagService);
            return featureFlagService.getFlag('enable_turbo_renderer');
        };
        this._initViewport();
        this._watchSurface(options.surfaceModel);
    }
    _initViewport() {
        this._disposables.add(this.viewport.viewportUpdated.subscribe(() => {
            this._markViewportDirty();
            this.refresh();
        }));
        this._disposables.add(this.viewport.sizeUpdated.subscribe(() => {
            if (this._sizeUpdatedRafId)
                return;
            this._sizeUpdatedRafId = requestConnectedFrame(() => {
                this._sizeUpdatedRafId = null;
                this._markSizeDirty();
                this._resetSize();
                this._render();
                this.refresh();
            }, this._container);
        }));
        this._disposables.add(this.viewport.zooming$.subscribe(isZooming => {
            const shouldRenderPlaceholders = this._turboEnabled() && isZooming;
            if (this.usePlaceholder !== shouldRenderPlaceholders) {
                this.usePlaceholder = shouldRenderPlaceholders;
                this._markUsePlaceholderDirty();
                this.refresh();
            }
        }));
        this.usePlaceholder = false;
    }
    _resetSize() {
        this.refresh();
    }
    _renderElement(elementModel, domElement) {
        const renderFn = this.std.getOptional(DomElementRendererIdentifier(elementModel.type));
        if (renderFn) {
            renderFn(elementModel, domElement, this);
        }
        else {
            // If no specific renderer is found (e.g., for 'shape' if the extension isn't registered,
            // or for other element types without a dedicated DOM renderer),
            // no specific DOM styling will be applied here by _renderElement.
            // Basic properties like position/size are handled in the _render loop if usePlaceholder is false.
            console.warn(`No DOM renderer found for element type: ${elementModel.type}`);
        }
    }
    _renderOrUpdatePlaceholder(elementModel, viewportBounds, zoom, addedElements) {
        let domElement = this._elementsMap.get(elementModel.id);
        if (!domElement) {
            domElement = document.createElement('div');
            domElement.dataset.elementId = elementModel.id;
            domElement.style.position = 'absolute';
            domElement.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
            this._elementsMap.set(elementModel.id, domElement);
            this.rootElement.append(domElement);
            addedElements.push(domElement);
        }
        const geometricStyles = calculatePlaceholderRect(elementModel, viewportBounds, zoom);
        const zIndexStyle = {
            'z-index': this.layerManager.getZIndex(elementModel),
        };
        Object.assign(domElement.style, geometricStyles, zIndexStyle);
        Object.assign(domElement.style, PLACEHOLDER_RESET_STYLES);
        // Clear classes specific to shapes, if applicable
        if (elementModel.type === 'shape') {
            const shapeModel = elementModel;
            domElement.classList.remove(`shape-${shapeModel.shapeType}`);
            domElement.classList.remove(`shape-style-${shapeModel.shapeStyle.toLowerCase()}`);
        }
    }
    _renderOrUpdateFullElement(elementModel, viewportBounds, zoom, addedElements) {
        let domElement = this._elementsMap.get(elementModel.id);
        if (!domElement) {
            domElement = document.createElement('div');
            domElement.dataset.elementId = elementModel.id;
            domElement.style.position = 'absolute';
            domElement.style.transformOrigin = 'top left';
            this._elementsMap.set(elementModel.id, domElement);
            this.rootElement.append(domElement);
            addedElements.push(domElement);
        }
        const geometricStyles = calculateFullElementRect(elementModel, viewportBounds, zoom);
        const opacityStyle = getOpacity(elementModel);
        const zIndexStyle = {
            'z-index': this.layerManager.getZIndex(elementModel),
        };
        Object.assign(domElement.style, geometricStyles, opacityStyle, zIndexStyle);
        this._renderElement(elementModel, domElement);
    }
    _render() {
        this._renderIncremental();
    }
    _watchSurface(surfaceModel) {
        this._disposables.add(surfaceModel.elementAdded.subscribe(payload => {
            this._markElementDirty(payload.id, UpdateType.ELEMENT_ADDED);
            this.refresh();
        }));
        this._disposables.add(surfaceModel.elementRemoved.subscribe(payload => {
            this._markElementDirty(payload.id, UpdateType.ELEMENT_REMOVED);
            this.refresh();
        }));
        this._disposables.add(surfaceModel.localElementAdded.subscribe(payload => {
            this._markElementDirty(payload.id, UpdateType.ELEMENT_ADDED);
            this.refresh();
        }));
        this._disposables.add(surfaceModel.localElementDeleted.subscribe(payload => {
            this._markElementDirty(payload.id, UpdateType.ELEMENT_REMOVED);
            this.refresh();
        }));
        this._disposables.add(surfaceModel.localElementUpdated.subscribe(payload => {
            this._markElementDirty(payload.model.id, UpdateType.ELEMENT_UPDATED);
            this.refresh();
        }));
        this._disposables.add(surfaceModel.elementUpdated.subscribe(payload => {
            // ignore externalXYWH update cause it's updated by the renderer
            if (payload.props['externalXYWH'])
                return;
            this._markElementDirty(payload.id, UpdateType.ELEMENT_UPDATED);
            this.refresh();
        }));
        // Workaround for the group rendering reactive update when selection changed
        let lastSet = new Set();
        this._disposables.add(this.std.selection.filter$(SurfaceSelection).subscribe(selections => {
            const groupRelatedSelection = new Set(selections.flatMap(s => s.elements.flatMap(e => {
                const element = surfaceModel.getElementById(e);
                if (element &&
                    (element.type === 'group' || element.groups.length !== 0)) {
                    return [element.id, ...element.groups.map(g => g.id)];
                }
                return [];
            })));
            if (lastSet.symmetricDifference(groupRelatedSelection).size !== 0) {
                lastSet.union(groupRelatedSelection).forEach(g => {
                    this._markElementDirty(g, UpdateType.ELEMENT_UPDATED);
                });
                this.refresh();
            }
            lastSet = groupRelatedSelection;
        }));
    }
    _markElementDirty(elementId, updateType) {
        this._updateState.dirtyElementIds.add(elementId);
        const currentUpdates = this._updateState.pendingUpdates.get(elementId) || [];
        if (!currentUpdates.includes(updateType)) {
            currentUpdates.push(updateType);
            this._updateState.pendingUpdates.set(elementId, currentUpdates);
        }
    }
    _markViewportDirty() {
        this._updateState.viewportDirty = true;
    }
    _markSizeDirty() {
        this._updateState.sizeDirty = true;
    }
    _markUsePlaceholderDirty() {
        this._updateState.usePlaceholderDirty = true;
    }
    _clearUpdateState() {
        this._updateState.dirtyElementIds.clear();
        this._updateState.viewportDirty = false;
        this._updateState.sizeDirty = false;
        this._updateState.usePlaceholderDirty = false;
        this._updateState.pendingUpdates.clear();
    }
    _isViewportChanged() {
        const { viewportBounds, zoom } = this.viewport;
        if (!this._lastViewportBounds || !this._lastZoom) {
            return true;
        }
        return (this._lastViewportBounds.x !== viewportBounds.x ||
            this._lastViewportBounds.y !== viewportBounds.y ||
            this._lastViewportBounds.w !== viewportBounds.w ||
            this._lastViewportBounds.h !== viewportBounds.h ||
            this._lastZoom !== zoom);
    }
    _isUsePlaceholderChanged() {
        return this._lastUsePlaceholder !== this.usePlaceholder;
    }
    _updateLastState() {
        const { viewportBounds, zoom } = this.viewport;
        this._lastViewportBounds = {
            x: viewportBounds.x,
            y: viewportBounds.y,
            w: viewportBounds.w,
            h: viewportBounds.h,
        };
        this._lastZoom = zoom;
        this._lastUsePlaceholder = this.usePlaceholder;
    }
    _renderIncremental() {
        const { viewportBounds, zoom } = this.viewport;
        const addedElements = [];
        const elementsToRemove = [];
        const needsFullRender = this._isViewportChanged() ||
            this._isUsePlaceholderChanged() ||
            this._updateState.sizeDirty ||
            this._updateState.viewportDirty ||
            this._updateState.usePlaceholderDirty;
        if (needsFullRender) {
            this._renderFull();
            this._updateLastState();
            this._clearUpdateState();
            return;
        }
        // Only update dirty elements
        const elementsFromGrid = this.grid.search(viewportBounds, {
            filter: ['canvas', 'local'],
        });
        const visibleElementIds = new Set();
        // 1. Update dirty elements
        for (const elementModel of elementsFromGrid) {
            const display = (elementModel.display ?? true) && !elementModel.hidden;
            if (display &&
                intersects(getBoundWithRotation(elementModel), viewportBounds)) {
                visibleElementIds.add(elementModel.id);
                // Only update dirty elements
                if (this._updateState.dirtyElementIds.has(elementModel.id)) {
                    if (this.usePlaceholder &&
                        !elementModel.forceFullRender) {
                        this._renderOrUpdatePlaceholder(elementModel, viewportBounds, zoom, addedElements);
                    }
                    else {
                        this._renderOrUpdateFullElement(elementModel, viewportBounds, zoom, addedElements);
                    }
                }
            }
        }
        // 2. Remove elements that are no longer in the grid
        for (const elementId of this._updateState.dirtyElementIds) {
            const updateTypes = this._updateState.pendingUpdates.get(elementId) || [];
            if (updateTypes.includes(UpdateType.ELEMENT_REMOVED) ||
                !visibleElementIds.has(elementId)) {
                const domElem = this._elementsMap.get(elementId);
                if (domElem) {
                    domElem.remove();
                    this._elementsMap.delete(elementId);
                    elementsToRemove.push(domElem);
                }
            }
        }
        // 3. Notify changes
        if (addedElements.length > 0 || elementsToRemove.length > 0) {
            this.elementsUpdated.next({
                elements: Array.from(this._elementsMap.values()),
                added: addedElements,
                removed: elementsToRemove,
            });
        }
        this._updateLastState();
        this._clearUpdateState();
    }
    _renderFull() {
        const { viewportBounds, zoom } = this.viewport;
        const addedElements = [];
        const elementsToRemove = [];
        // Step 1: Handle elements whose models are deleted from the surface
        const prevRenderedElementIds = Array.from(this._elementsMap.keys());
        for (const id of prevRenderedElementIds) {
            const modelExists = this.layerManager.layers.some(layer => layer.elements.some(elem => elem.id === id));
            if (!modelExists) {
                const domElem = this._elementsMap.get(id);
                if (domElem) {
                    domElem.remove();
                    this._elementsMap.delete(id);
                    elementsToRemove.push(domElem);
                }
            }
        }
        // Step 2: Render elements in the current viewport
        const elementsFromGrid = this.grid.search(viewportBounds, {
            filter: ['canvas', 'local'],
        });
        const visibleElementIds = new Set();
        for (const elementModel of elementsFromGrid) {
            const display = (elementModel.display ?? true) && !elementModel.hidden;
            if (display &&
                intersects(getBoundWithRotation(elementModel), viewportBounds)) {
                visibleElementIds.add(elementModel.id);
                if (this.usePlaceholder &&
                    !elementModel.forceFullRender) {
                    this._renderOrUpdatePlaceholder(elementModel, viewportBounds, zoom, addedElements);
                }
                else {
                    // Full render
                    this._renderOrUpdateFullElement(elementModel, viewportBounds, zoom, addedElements);
                }
            }
        }
        // Step 3: Remove DOM elements that are in _elementsMap but were not processed in Step 2
        const currentRenderedElementIds = Array.from(this._elementsMap.keys());
        for (const id of currentRenderedElementIds) {
            if (!visibleElementIds.has(id)) {
                const domElem = this._elementsMap.get(id);
                if (domElem) {
                    domElem.remove();
                    this._elementsMap.delete(id);
                    if (!elementsToRemove.includes(domElem)) {
                        elementsToRemove.push(domElem);
                    }
                }
            }
        }
        // Step 4: Notify about changes
        if (addedElements.length > 0 || elementsToRemove.length > 0) {
            this.elementsUpdated.next({
                elements: Array.from(this._elementsMap.values()),
                added: addedElements,
                removed: elementsToRemove,
            });
        }
    }
}
//# sourceMappingURL=dom-renderer.js.map