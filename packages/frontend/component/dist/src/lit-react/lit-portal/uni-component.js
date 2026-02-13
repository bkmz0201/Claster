import { jsx as _jsx } from "react/jsx-runtime";
import { nanoid } from 'nanoid';
import { memo, useEffect, useState, } from 'react';
import { createPortal } from 'react-dom';
const UniReactNode = memo(function UniReactNode(props) {
    const Component = props.component;
    const [data, setData] = useState(props.dataRef.value);
    useEffect(() => {
        return props.dataRef.subscribe(() => {
            setData(props.dataRef.value);
        });
    }, [props.dataRef]);
    return createPortal(_jsx(Component, { ref: props.expose, ...data }), props.ele);
}, () => true);
const createDataRef = (data) => {
    let listener = () => { };
    const ref = {
        value: data,
        subscribe: (update) => {
            listener = update;
            return () => {
                listener = () => { };
            };
        },
        update: (props) => {
            ref.value = props;
            listener();
        },
    };
    return ref;
};
export const createUniReactRoot = () => {
    const nodes = new Set();
    let updateNodes = () => { };
    return {
        Root: () => {
            const [, forceUpdate] = useState({});
            useEffect(() => {
                updateNodes = () => forceUpdate({});
            }, []);
            return nodes;
        },
        createUniComponent: (component) => {
            return (ele, props, expose) => {
                const dataRef = createDataRef(props);
                const node = (_jsx(UniReactNode, { expose: expose, ele: ele, component: component, dataRef: dataRef }, nanoid()));
                nodes.add(node);
                updateNodes();
                return {
                    update: (props) => {
                        dataRef.update(props);
                    },
                    unmount: () => {
                        nodes.delete(node);
                        updateNodes();
                    },
                };
            };
        },
    };
};
export const uniReactRoot = createUniReactRoot();
//# sourceMappingURL=uni-component.js.map