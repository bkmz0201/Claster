import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { attachClosestEdge, extractClosestEdge, } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { attachInstruction, extractInstruction, } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';
import { useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { shallowUpdater } from '../../utils';
import { getAdaptedEventArgs, isExternalDrag } from './common';
import { DNDContext } from './context';
function dropTargetGet(get, options) {
    if (get === undefined) {
        return undefined;
    }
    return ((args) => {
        if (typeof get === 'function') {
            return get({
                ...getAdaptedEventArgs(args, options.fromExternalData),
                get treeInstruction() {
                    return options.treeInstruction
                        ? extractInstruction(attachInstruction({}, {
                            input: args.input,
                            element: args.element,
                            currentLevel: options.treeInstruction.currentLevel,
                            indentPerLevel: options.treeInstruction.indentPerLevel,
                            mode: options.treeInstruction.mode,
                            block: options.treeInstruction.block,
                        }))
                        : null;
                },
                get closestEdge() {
                    return options.closestEdge
                        ? extractClosestEdge(attachClosestEdge({}, {
                            input: args.input,
                            element: args.element,
                            allowedEdges: options.closestEdge.allowedEdges,
                        }))
                        : null;
                },
            });
        }
        else {
            return {
                ...getAdaptedEventArgs(args, options.fromExternalData),
                ...get,
            };
        }
    });
}
export const useDropTarget = (getOptions = () => ({}), deps = []) => {
    const dropTargetRef = useRef(null);
    const [draggedOver, setDraggedOver] = useState(false);
    const [treeInstruction, setTreeInstruction] = useState(null);
    const [closestEdge, setClosestEdge] = useState(null);
    const [dropEffect, setDropEffect] = useState(null);
    const [draggedOverDraggable, setDraggedOverDraggable] = useState(null);
    const [draggedOverPosition, setDraggedOverPosition] = useState({ relativeX: 0, relativeY: 0, clientX: 0, clientY: 0 });
    const enableDraggedOver = useRef(false);
    const enableDraggedOverDraggable = useRef(false);
    const enableDraggedOverPosition = useRef(false);
    const enableDropEffect = useRef(false);
    const dropTargetContext = useContext(DNDContext);
    const options = useMemo(() => {
        const opts = getOptions();
        const allowExternal = opts.allowExternal ?? !!opts.fromExternalData;
        return {
            ...opts,
            allowExternal,
            fromExternalData: allowExternal
                ? (opts.fromExternalData ??
                    dropTargetContext.fromExternalData)
                : undefined,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, getOptions, dropTargetContext.fromExternalData]);
    const getDropTargetOptions = useCallback(() => {
        const wrappedCanDrop = dropTargetGet(options.canDrop, options);
        let element = dropTargetRef.current;
        if (!element ||
            (typeof options.canDrop === 'boolean' && !options.canDrop)) {
            return null;
        }
        const updateDragOver = (args, handler) => {
            args = getAdaptedEventArgs(args, options.fromExternalData);
            if (args.location.current.dropTargets[0]?.element === dropTargetRef.current) {
                if (enableDraggedOverDraggable.current) {
                    setDraggedOverDraggable(shallowUpdater(args.source));
                }
                let instruction = null;
                let closestEdge = null;
                if (options.treeInstruction) {
                    instruction = extractInstruction(args.self.data);
                    setTreeInstruction(shallowUpdater(instruction));
                    if (dropTargetRef.current) {
                        dropTargetRef.current.dataset['treeInstruction'] =
                            instruction?.type;
                    }
                }
                if (options.closestEdge) {
                    closestEdge = extractClosestEdge(args.self.data);
                    setClosestEdge(shallowUpdater(closestEdge));
                }
                if (enableDropEffect.current) {
                    setDropEffect(shallowUpdater(args.self.dropEffect));
                }
                if (enableDraggedOverPosition.current) {
                    const rect = args.self.element.getBoundingClientRect();
                    const { clientX, clientY } = args.location.current.input;
                    setDraggedOverPosition(shallowUpdater({
                        relativeX: clientX - rect.x,
                        relativeY: clientY - rect.y,
                        clientX: clientX,
                        clientY: clientY,
                    }));
                }
                handler?.({
                    ...args,
                    treeInstruction: instruction,
                    closestEdge,
                });
            }
        };
        return {
            element,
            canDrop: wrappedCanDrop
                ? (args) => {
                    // check if args has data. if not, it's an external drag
                    // we always allow external drag since the data is only
                    // available in drop event
                    if (isExternalDrag(args) && options.fromExternalData) {
                        return true;
                    }
                    return wrappedCanDrop(args);
                }
                : undefined,
            getDropEffect: dropTargetGet(options.dropEffect, options),
            getIsSticky: dropTargetGet(options.isSticky, options),
            onDrop: (_args) => {
                if (enableDraggedOver.current) {
                    setDraggedOver(false);
                }
                if (enableDraggedOverDraggable.current) {
                    setDraggedOverDraggable(null);
                }
                if (enableDraggedOverPosition.current) {
                    setDraggedOverPosition({
                        relativeX: 0,
                        relativeY: 0,
                        clientX: 0,
                        clientY: 0,
                    });
                }
                if (options.treeInstruction) {
                    setTreeInstruction(null);
                    if (element) {
                        delete element.dataset['treeInstruction'];
                    }
                }
                if (options.closestEdge) {
                    setClosestEdge(null);
                }
                if (enableDropEffect.current) {
                    setDropEffect(null);
                }
                if (element) {
                    delete element.dataset['draggedOver'];
                }
                // external data is only available in drop event thus
                // this is the only case for getAdaptedEventArgs
                const args = {
                    ...getAdaptedEventArgs(_args, options.fromExternalData, true),
                    treeInstruction: extractInstruction(_args.self.data),
                    closestEdge: extractClosestEdge(_args.self.data),
                };
                if (isExternalDrag(_args) &&
                    options.fromExternalData &&
                    typeof options.canDrop === 'function' &&
                    // there is a small flaw that canDrop called in onDrop misses
                    // `input and `element` arguments
                    !options.canDrop(args)) {
                    return;
                }
                if (args.location.current.dropTargets[0]?.element === element) {
                    options.onDrop?.(args);
                }
            },
            getData: (args) => {
                args = getAdaptedEventArgs(args, options.fromExternalData);
                const originData = dropTargetGet(options.data ?? {}, options)(args);
                const { input, element } = args;
                const withInstruction = options.treeInstruction
                    ? attachInstruction(originData, {
                        input,
                        element,
                        currentLevel: options.treeInstruction.currentLevel,
                        indentPerLevel: options.treeInstruction.indentPerLevel,
                        mode: options.treeInstruction.mode,
                        block: options.treeInstruction.block,
                    })
                    : originData;
                const withClosestEdge = options.closestEdge
                    ? attachClosestEdge(withInstruction, {
                        element,
                        input,
                        allowedEdges: options.closestEdge.allowedEdges,
                    })
                    : withInstruction;
                return withClosestEdge;
            },
            onDrag: (args) => {
                updateDragOver(args, options.onDrag);
            },
            onDragEnter: (args) => {
                updateDragOver(args, options.onDragEnter);
            },
            onDragLeave: (args) => {
                args = getAdaptedEventArgs(args, options.fromExternalData);
                const withClosestEdge = options.closestEdge
                    ? attachClosestEdge(args.self.data, {
                        element: args.self.element,
                        input: args.location.current.input,
                        allowedEdges: options.closestEdge.allowedEdges,
                    })
                    : args.self.data;
                options.onDragLeave?.({
                    ...args,
                    self: { ...args.self, data: withClosestEdge },
                });
            },
            onDropTargetChange: (args) => {
                args = getAdaptedEventArgs(args, options.fromExternalData);
                if (args.location.current.dropTargets[0]?.element === element) {
                    if (enableDraggedOver.current) {
                        setDraggedOver(true);
                    }
                    if (options.treeInstruction) {
                        const instruction = extractInstruction(args.self.data);
                        setTreeInstruction(instruction);
                        if (element) {
                            element.dataset['treeInstruction'] = instruction?.type;
                        }
                    }
                    if (options.closestEdge) {
                        const closestEdge = extractClosestEdge(args.self.data);
                        setClosestEdge(closestEdge);
                    }
                    if (enableDropEffect.current) {
                        setDropEffect(args.self.dropEffect);
                    }
                    if (enableDraggedOverDraggable.current) {
                        setDraggedOverDraggable(args.source);
                    }
                    if (enableDraggedOverPosition.current) {
                        const rect = args.self.element.getBoundingClientRect();
                        setDraggedOverPosition({
                            relativeX: args.location.current.input.clientX - rect.x,
                            relativeY: args.location.current.input.clientY - rect.y,
                            clientX: args.location.current.input.clientX,
                            clientY: args.location.current.input.clientY,
                        });
                    }
                    if (element) {
                        element.dataset['draggedOver'] = 'true';
                    }
                }
                else {
                    if (enableDraggedOver.current) {
                        setDraggedOver(false);
                    }
                    if (enableDraggedOverDraggable.current) {
                        setDraggedOverDraggable(null);
                    }
                    if (options.treeInstruction) {
                        setTreeInstruction(null);
                        if (element) {
                            delete element.dataset['treeInstruction'];
                        }
                    }
                    if (enableDropEffect.current) {
                        setDropEffect(args.self.dropEffect);
                    }
                    if (enableDraggedOverPosition.current) {
                        setDraggedOverPosition({
                            relativeX: 0,
                            relativeY: 0,
                            clientX: 0,
                            clientY: 0,
                        });
                    }
                    if (options.closestEdge) {
                        setClosestEdge(null);
                    }
                    if (element) {
                        delete element.dataset['draggedOver'];
                    }
                }
            },
        };
    }, [options]);
    useEffect(() => {
        const dropTargetOptions = getDropTargetOptions();
        if (!dropTargetOptions) {
            return;
        }
        // @ts-expect-error: fix type error
        const cleanup = [dropTargetForElements(dropTargetOptions)];
        if (options.allowExternal && options.fromExternalData) {
            // @ts-expect-error: fix type error
            cleanup.push(dropTargetForExternal(dropTargetOptions));
        }
        return combine(...cleanup);
    }, [
        getDropTargetOptions,
        options.canDrop,
        options.allowExternal,
        options.fromExternalData,
    ]);
    return {
        dropTargetRef,
        get draggedOver() {
            enableDraggedOver.current = true;
            return draggedOver;
        },
        get draggedOverDraggable() {
            enableDraggedOverDraggable.current = true;
            return draggedOverDraggable;
        },
        get draggedOverPosition() {
            enableDraggedOverPosition.current = true;
            return draggedOverPosition;
        },
        get dropEffect() {
            enableDropEffect.current = true;
            return dropEffect;
        },
        treeInstruction,
        closestEdge,
    };
};
//# sourceMappingURL=drop-target.js.map