import { jsx as _jsx } from "react/jsx-runtime";
import * as styles from './paper.css';
import { Segments } from './segments';
export const Paper = (props) => {
    return (_jsx("div", { className: styles.paper, children: _jsx(Segments, { level: props.segments, root: true, index: props.segments, ...props }) }));
};
//# sourceMappingURL=paper.js.map