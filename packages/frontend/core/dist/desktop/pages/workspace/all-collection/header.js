import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import { Header } from '@affine/core/components/pure/header';
import { PlusIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import * as styles from './header.css';
export const AllCollectionHeader = ({ showCreateNew, onCreateCollection, }) => {
    return (_jsx(Header, { right: _jsx(IconButton, { size: "16", icon: _jsx(PlusIcon, {}), onClick: onCreateCollection, className: clsx(styles.headerCreateNewCollectionIconButton, !showCreateNew && styles.headerCreateNewButtonHidden) }), left: _jsx(ExplorerNavigation, { active: 'collections' }) }));
};
//# sourceMappingURL=header.js.map