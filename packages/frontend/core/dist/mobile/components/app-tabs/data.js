import { AllDocsIcon, HomeIcon } from '@blocksuite/icons/rc';
import { AppTabCreate } from './create';
import { AppTabJournal } from './journal';
export const tabs = [
    {
        key: 'home',
        to: '/home',
        Icon: HomeIcon,
    },
    {
        key: 'all',
        to: '/all',
        Icon: AllDocsIcon,
    },
    {
        key: 'journal',
        custom: AppTabJournal,
    },
    {
        key: 'new',
        custom: AppTabCreate,
    },
];
//# sourceMappingURL=data.js.map