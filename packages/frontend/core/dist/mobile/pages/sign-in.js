import { jsx as _jsx } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useNavigate } from 'react-router-dom';
import { MobileSignInPanel } from '../components/sign-in';
export const Component = () => {
    const navigate = useNavigate();
    return _jsx(MobileSignInPanel, { onClose: () => navigate('/') });
};
//# sourceMappingURL=sign-in.js.map