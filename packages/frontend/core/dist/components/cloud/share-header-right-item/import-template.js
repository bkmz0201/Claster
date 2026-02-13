import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useI18n } from '@affine/i18n';
export const ImportTemplateButton = ({ name, snapshotUrl, }) => {
    const t = useI18n();
    const { jumpToImportTemplate } = useNavigateHelper();
    return (_jsx(Button, { variant: "primary", onClick: () => jumpToImportTemplate(name, snapshotUrl), children: t['com.affine.share-page.header.import-template']() }));
};
//# sourceMappingURL=import-template.js.map