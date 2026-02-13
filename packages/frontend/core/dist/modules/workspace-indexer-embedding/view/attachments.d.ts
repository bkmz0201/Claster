import type { AttachmentFile } from '../types';
interface AttachmentsProps {
    attachments: AttachmentFile[];
    totalCount: number;
    onPageChange: (offset: number) => void;
    onDelete: (id: string) => void;
    disabled: boolean;
}
export declare const Attachments: React.FC<AttachmentsProps>;
export {};
//# sourceMappingURL=attachments.d.ts.map