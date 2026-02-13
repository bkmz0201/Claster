import {} from '@affine/core/modules/permissions';
import { useGuard } from './use-guard';
export const Guard = (props) => {
    const { permission, children, ...rest } = props;
    const docId = 'docId' in rest ? [rest.docId] : [];
    const can = useGuard(permission, ...docId);
    if (typeof children === 'function') {
        return children(can);
    }
    throw new Error('children must be a function');
};
//# sourceMappingURL=guard.js.map