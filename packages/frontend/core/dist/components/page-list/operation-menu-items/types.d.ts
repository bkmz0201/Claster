import type { HTMLAttributes } from 'react';
export type CommonMenuItemProps<SelectParams = undefined> = {
    onItemClick?: () => void;
    onSelect?: (params?: SelectParams) => void;
} & HTMLAttributes<HTMLButtonElement>;
//# sourceMappingURL=types.d.ts.map