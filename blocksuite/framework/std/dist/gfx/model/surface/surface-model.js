import { DisposableGroup } from '@blocksuite/global/disposable';
import { assertType } from '@blocksuite/global/utils';
import { BlockModel, nanoid } from '@blocksuite/store';
import { signal } from '@preact/signals-core';
import { Subject } from 'rxjs';
import * as Y from 'yjs';
import { isGfxGroupCompatibleModel, } from '../base.js';
import { createDecoratorState } from './decorators/common.js';
import { initializeObservers, initializeWatchers } from './decorators/index.js';
import { GfxGroupLikeElementModel, syncElementFromY, } from './element-model.js';
/**
 * Used for text field
 */
export const SURFACE_TEXT_UNIQ_IDENTIFIER = 'affine:surface:text';
/**
 * Used for field that use Y.Map. E.g. group children field
 */
export const SURFACE_YMAP_UNIQ_IDENTIFIER = 'affine:surface:ymap';
export class SurfaceBlockModel extends BlockModel {
    get elementModels() {
        const models = [];
        this._elementModels.forEach(model => models.push(model.model));
        return models;
    }
    get elements() {
        return this.props.elements;
    }
    get localElementModels() {
        return this.localElements;
    }
    get registeredElementTypes() {
        return Object.keys(this._elementCtorMap);
    }
    isEmpty() {
        return this._isEmpty$.value;
    }
    constructor() {
        super();
        this._decoratorState = createDecoratorState();
        this._elementCtorMap = Object.create(null);
        this._elementModels = new Map();
        this._elementTypeMap = new Map();
        this._groupLikeModels = new Map();
        this._middlewares = [];
        this._surfaceBlockModel = true;
        this.localElements = new Set();
        this.elementAdded = new Subject();
        this.elementRemoved = new Subject();
        this.elementUpdated = new Subject();
        this.localElementAdded = new Subject();
        this.localElementDeleted = new Subject();
        this.localElementUpdated = new Subject();
        this._isEmpty$ = signal(false);
        const subscription = this.created.subscribe(() => {
            this._init();
            subscription.unsubscribe();
        });
    }
    _createElementFromProps(props, options) {
        const { type, id, ...rest } = props;
        if (!id) {
            throw new Error('Cannot find id in props');
        }
        const yMap = new Y.Map();
        const elementModel = this._createElementFromYMap(type, id, yMap, {
            ...options,
            newCreate: true,
        });
        props = this._propsToY(type, props);
        yMap.set('type', type);
        yMap.set('id', id);
        Object.keys(rest).forEach(key => {
            if (props[key] !== undefined) {
                // @ts-expect-error ignore
                elementModel.model[key] = props[key];
            }
        });
        return elementModel;
    }
    _createElementFromYMap(type, id, yMap, options) {
        const stashed = new Map();
        const Ctor = this._elementCtorMap[type];
        if (!Ctor) {
            throw new Error(`Invalid element type: ${yMap.get('type')}`);
        }
        const state = this._decoratorState;
        state.creating = true;
        state.skipField = options.skipFieldInit ?? false;
        let mounted = false;
        // @ts-expect-error ignore
        Ctor['_decoratorState'] = state;
        const elementModel = new Ctor({
            id,
            yMap,
            model: this,
            stashedStore: stashed,
            onChange: payload => mounted && options.onChange({ id, ...payload }),
        });
        // @ts-expect-error ignore
        delete Ctor['_decoratorState'];
        state.creating = false;
        state.skipField = false;
        const unmount = () => {
            mounted = false;
            elementModel.onDestroyed();
        };
        const mount = () => {
            initializeObservers(Ctor.prototype, elementModel);
            initializeWatchers(Ctor.prototype, elementModel);
            elementModel['_disposable'].add(syncElementFromY(elementModel, payload => {
                mounted &&
                    options.onChange({
                        id,
                        ...payload,
                    });
            }));
            mounted = true;
            elementModel.onCreated();
        };
        return {
            model: elementModel,
            mount,
            unmount,
        };
    }
    _initElementModels() {
        const elementsYMap = this.elements.getValue();
        const addToType = (type, model) => {
            const sameTypeElements = this._elementTypeMap.get(type) || [];
            if (sameTypeElements.indexOf(model) === -1) {
                sameTypeElements.push(model);
            }
            this._elementTypeMap.set(type, sameTypeElements);
            if (isGfxGroupCompatibleModel(model)) {
                this._groupLikeModels.set(model.id, model);
            }
        };
        const removeFromType = (type, model) => {
            const sameTypeElements = this._elementTypeMap.get(type) || [];
            const index = sameTypeElements.indexOf(model);
            if (index !== -1) {
                sameTypeElements.splice(index, 1);
            }
            if (this._groupLikeModels.has(model.id)) {
                this._groupLikeModels.delete(model.id);
            }
        };
        const onElementsMapChange = (event, transaction) => {
            const { changes, keysChanged } = event;
            const addedElements = [];
            const deletedElements = [];
            keysChanged.forEach(id => {
                const change = changes.keys.get(id);
                const element = this.elements.getValue().get(id);
                switch (change?.action) {
                    case 'add':
                        if (element) {
                            const hasModel = this._elementModels.has(id);
                            const model = hasModel
                                ? this._elementModels.get(id)
                                : this._createElementFromYMap(element.get('type'), element.get('id'), element, {
                                    onChange: payload => {
                                        this.elementUpdated.next(payload);
                                        Object.keys(payload.props).forEach(key => {
                                            model.model.propsUpdated.next({ key });
                                        });
                                    },
                                    skipFieldInit: true,
                                });
                            !hasModel && this._elementModels.set(id, model);
                            addToType(model.model.type, model.model);
                            addedElements.push(model);
                        }
                        break;
                    case 'delete':
                        if (this._elementModels.has(id)) {
                            const { model, unmount } = this._elementModels.get(id);
                            removeFromType(model.type, model);
                            this._elementModels.delete(id);
                            deletedElements.push({ model, unmount });
                        }
                        break;
                }
            });
            addedElements.forEach(({ mount, model }) => {
                mount();
                this.elementAdded.next({ id: model.id, local: transaction.local });
            });
            deletedElements.forEach(({ unmount, model }) => {
                unmount();
                this.elementRemoved.next({
                    id: model.id,
                    type: model.type,
                    model,
                    local: transaction.local,
                });
            });
        };
        elementsYMap.forEach((val, key) => {
            const model = this._createElementFromYMap(val.get('type'), val.get('id'), val, {
                onChange: payload => {
                    (this.elementUpdated.next(payload),
                        Object.keys(payload.props).forEach(key => {
                            model.model.propsUpdated.next({ key });
                        }));
                },
                skipFieldInit: true,
            });
            this._elementModels.set(key, model);
        });
        this._elementModels.forEach(({ mount, model }) => {
            addToType(model.type, model);
            mount();
        });
        Object.values(this.store.blocks.peek()).forEach(block => {
            if (isGfxGroupCompatibleModel(block.model)) {
                this._groupLikeModels.set(block.id, block.model);
            }
        });
        elementsYMap.observe(onElementsMapChange);
        const subscription = this.store.slots.blockUpdated.subscribe(payload => {
            switch (payload.type) {
                case 'add':
                    if (isGfxGroupCompatibleModel(payload.model)) {
                        this._groupLikeModels.set(payload.id, payload.model);
                    }
                    break;
                case 'delete':
                    if (isGfxGroupCompatibleModel(payload.model)) {
                        this._groupLikeModels.delete(payload.id);
                    }
                    {
                        const group = this.getGroup(payload.id);
                        if (group) {
                            // oxlint-disable-next-line unicorn/prefer-dom-node-remove
                            group.removeChild(payload.model);
                        }
                    }
                    break;
            }
        });
        this.deleted.subscribe(() => {
            elementsYMap.unobserve(onElementsMapChange);
            subscription.unsubscribe();
        });
    }
    _propsToY(type, props) {
        const ctor = this._elementCtorMap[type];
        if (!ctor) {
            throw new Error(`Invalid element type: ${type}`);
        }
        Object.entries(props).forEach(([key, val]) => {
            if (val instanceof Object) {
                if (Reflect.has(val, SURFACE_TEXT_UNIQ_IDENTIFIER)) {
                    const yText = new Y.Text();
                    yText.applyDelta(Reflect.get(val, 'delta'));
                    Reflect.set(props, key, yText);
                }
                if (Reflect.has(val, SURFACE_YMAP_UNIQ_IDENTIFIER)) {
                    const childJson = Reflect.get(val, 'json');
                    const childrenYMap = new Y.Map();
                    Object.keys(childJson).forEach(childId => {
                        childrenYMap.set(childId, childJson[childId]);
                    });
                    Reflect.set(props, key, childrenYMap);
                }
            }
        });
        // @ts-expect-error ignore
        return ctor.propsToY ? ctor.propsToY(props) : props;
    }
    _watchGroupRelationChange() {
        const isGroup = (element) => element instanceof GfxGroupLikeElementModel;
        const disposable = this.elementUpdated.subscribe(({ id, oldValues }) => {
            const element = this.getElementById(id);
            if (isGroup(element) &&
                oldValues['childIds'] &&
                element.childIds.length === 0) {
                this.deleteElement(id);
            }
        });
        this.deleted.subscribe(() => {
            disposable.unsubscribe();
        });
    }
    _watchChildrenChange() {
        const updateIsEmpty = () => {
            this._isEmpty$.value =
                this._elementModels.size === 0 && this.children.length === 0;
        };
        const disposables = new DisposableGroup();
        disposables.add(this.elementAdded.subscribe(updateIsEmpty));
        disposables.add(this.elementRemoved.subscribe(updateIsEmpty));
        this.store.slots.blockUpdated.subscribe(payload => {
            if (['add', 'delete'].includes(payload.type)) {
                updateIsEmpty();
            }
        });
        this.deleted.subscribe(() => {
            disposables.dispose();
        });
    }
    _extendElement(ctorMap) {
        Object.assign(this._elementCtorMap, ctorMap);
    }
    _init() {
        this._initElementModels();
        this._watchGroupRelationChange();
        this._watchChildrenChange();
    }
    getConstructor(type) {
        return this._elementCtorMap[type];
    }
    addElement(props) {
        if (this.store.readonly) {
            throw new Error('Cannot add element in readonly mode');
        }
        const middlewareCtx = {
            type: 'beforeAdd',
            payload: {
                type: props.type,
                props,
            },
        };
        this._middlewares.forEach(mid => mid(middlewareCtx));
        props = middlewareCtx.payload.props;
        const id = nanoid();
        // @ts-expect-error ignore
        props.id = id;
        const elementModel = this._createElementFromProps(props, {
            onChange: payload => {
                this.elementUpdated.next(payload);
                Object.keys(payload.props).forEach(key => {
                    elementModel.model.propsUpdated.next({ key });
                });
            },
        });
        this._elementModels.set(id, elementModel);
        this.store.transact(() => {
            this.elements.getValue().set(id, elementModel.model.yMap);
        });
        return id;
    }
    addLocalElement(elem) {
        this.localElements.add(elem);
        this.localElementAdded.next(elem);
    }
    applyMiddlewares(middlewares) {
        this._middlewares = middlewares;
    }
    deleteElement(id) {
        if (this.store.readonly) {
            throw new Error('Cannot remove element in readonly mode');
        }
        if (!this.hasElementById(id)) {
            return;
        }
        this.store.transact(() => {
            const element = this.getElementById(id);
            const group = this.getGroup(id);
            if (element instanceof GfxGroupLikeElementModel) {
                element.childIds.forEach(childId => {
                    if (this.hasElementById(childId)) {
                        this.deleteElement(childId);
                    }
                    else if (this.store.hasBlock(childId)) {
                        this.store.deleteBlock(this.store.getBlock(childId).model);
                    }
                });
            }
            // oxlint-disable-next-line unicorn/prefer-dom-node-remove
            group?.removeChild(element);
            this.elements.getValue().delete(id);
        });
    }
    deleteLocalElement(elem) {
        if (this.localElements.delete(elem)) {
            this.localElementDeleted.next(elem);
        }
    }
    dispose() {
        super.dispose();
        this.elementAdded.complete();
        this.elementRemoved.complete();
        this.elementUpdated.complete();
        this._elementModels.forEach(({ unmount }) => unmount());
        this._elementModels.clear();
    }
    getElementById(id) {
        return this._elementModels.get(id)?.model ?? null;
    }
    getElementsByType(type) {
        return this._elementTypeMap.get(type) || [];
    }
    getGroup(elem) {
        elem =
            typeof elem === 'string'
                ? (this.getElementById(elem) ??
                    this.store.getBlock(elem)?.model)
                : elem;
        if (!elem)
            return null;
        assertType(elem);
        for (const group of this._groupLikeModels.values()) {
            if (group.hasChild(elem)) {
                return group;
            }
        }
        return null;
    }
    /**
     * Get all groups in the group chain. The last group is the top level group.
     * @param id
     * @returns
     */
    getGroups(id) {
        const groups = [];
        const visited = new Set();
        let group = this.getGroup(id);
        while (group) {
            if (visited.has(group)) {
                console.warn('Exists a cycle in group relation');
                break;
            }
            visited.add(group);
            groups.push(group);
            group = this.getGroup(group.id);
        }
        return groups;
    }
    hasElementById(id) {
        return this._elementModels.has(id);
    }
    isGroup(element) {
        if (typeof element === 'string') {
            const el = this.getElementById(element);
            if (el)
                return isGfxGroupCompatibleModel(el);
            const blockModel = this.store.getBlock(element)?.model;
            if (blockModel)
                return isGfxGroupCompatibleModel(blockModel);
            return false;
        }
        else {
            return isGfxGroupCompatibleModel(element);
        }
    }
    updateElement(id, props) {
        if (this.store.readonly) {
            throw new Error('Cannot update element in readonly mode');
        }
        const elementModel = this.getElementById(id);
        if (!elementModel) {
            throw new Error(`Element ${id} is not found`);
        }
        this.store.transact(() => {
            props = this._propsToY(elementModel.type, props);
            Object.entries(props).forEach(([key, value]) => {
                // @ts-expect-error ignore
                elementModel[key] = value;
            });
        });
    }
}
//# sourceMappingURL=surface-model.js.map