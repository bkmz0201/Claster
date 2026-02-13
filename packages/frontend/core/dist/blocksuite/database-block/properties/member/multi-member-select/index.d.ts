import { type ExistedUserInfo, type UserListService, type UserService } from '@blocksuite/affine/shared/services';
import { type ReadonlySignal } from '@preact/signals-core';
import { type MouseEvent } from 'react';
type BaseOptions = {
    userService: UserService;
    userListService: UserListService;
    onComplete: () => void;
};
export type MemberManagerOptions = ({
    multiple: true;
    value: ReadonlySignal<string[]>;
    onChange: (value: string[]) => void;
} & BaseOptions) | ({
    multiple: false;
    value: ReadonlySignal<string>;
    onChange: (value?: string) => void;
} & BaseOptions);
declare class MemberManager {
    private readonly ops;
    selectedMembers: ReadonlySignal<string[]>;
    selectedMemberId: import("@preact/signals-core").Signal<string | null>;
    filteredMembers: ReadonlySignal<import("@blocksuite/affine-shared/services").AffineUserInfo[]>;
    constructor(ops: MemberManagerOptions);
    get userService(): UserService;
    get userListService(): UserListService;
    search: (searchText: string) => void;
    selectMember: (memberId: string) => void;
    moveSelectionAfterSelect: (selectedId: string) => void;
    removeMember: (memberId: string, e?: MouseEvent) => void;
    complete: () => void;
    getSelectedIndex: () => number;
    moveSelectionUp: () => void;
    moveSelectionDown: () => void;
    scrollSelectedIntoView: (memberListRef: React.RefObject<HTMLDivElement | null>) => void;
    confirmSelection: () => void;
}
export declare const MemberListItem: (props: {
    member: ExistedUserInfo;
    memberManager: MemberManager;
    isSelected?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const MemberPreview: ({ memberId, memberManager, onDelete, }: {
    memberId: string;
    memberManager: MemberManager;
    onDelete?: () => void;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const MultiMemberSelect: React.FC<MemberManagerOptions>;
export {};
//# sourceMappingURL=index.d.ts.map