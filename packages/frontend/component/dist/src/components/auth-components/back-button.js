import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { ArrowLeftSmallIcon } from '@blocksuite/icons/rc';
import { Button } from '../../ui/button';
export const BackButton = props => {
    const t = useI18n();
    return (_jsx(Button, { variant: "plain", style: {
            padding: '2px 8px 2px 0',
        }, prefix: _jsx(ArrowLeftSmallIcon, {}), ...props, children: t['com.affine.backButton']() }));
};
//# sourceMappingURL=back-button.js.map