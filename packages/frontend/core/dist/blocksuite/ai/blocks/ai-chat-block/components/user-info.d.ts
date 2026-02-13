import { LitElement, type TemplateResult } from 'lit';
import type { MessageRole, MessageUserInfo } from '../../../components/ai-chat-messages';
export declare class UserInfo extends LitElement {
    static styles: import("lit").CSSResult;
    private _handleAvatarLoadError;
    render(): TemplateResult<1>;
    accessor avatarIcon: TemplateResult<1> | undefined;
    accessor avatarLoadedFailed: boolean;
    accessor avatarUrl: string | undefined;
    accessor userName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-info': UserInfo;
    }
}
export declare function UserInfoTemplate(userInfo: MessageUserInfo, messageRole?: MessageRole): TemplateResult<1>;
//# sourceMappingURL=user-info.d.ts.map