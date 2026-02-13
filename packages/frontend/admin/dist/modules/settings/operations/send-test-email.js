import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { useMutation } from '@affine/admin/use-mutation';
import { notify } from '@affine/component';
import { sendTestEmailMutation } from '@affine/graphql';
import { useCallback } from 'react';
export function SendTestEmail({ appConfig }) {
    const { trigger } = useMutation({
        mutation: sendTestEmailMutation,
    });
    const onClick = useCallback(() => {
        trigger(appConfig.mailer.SMTP)
            .then(() => {
            notify.success({
                title: 'Test email sent',
                message: 'The test email has been successfully sent.',
            });
        })
            .catch((err) => {
            notify.error({
                title: 'Failed to send test email',
                message: err.message,
            });
        });
    }, [appConfig, trigger]);
    return _jsx(Button, { onClick: onClick, children: "Send Test Email" });
}
//# sourceMappingURL=send-test-email.js.map