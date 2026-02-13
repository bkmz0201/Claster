export interface PaginationProps {
    totalCount: number;
    pageNum?: number;
    countPerPage: number;
    onPageChange: (skip: number, pageNum: number) => void;
}
export declare const Pagination: ({ totalCount, countPerPage, pageNum, onPageChange, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=pagination.d.ts.map