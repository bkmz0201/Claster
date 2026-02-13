import type { JSX } from 'react';
import type { User } from '../auth-components';
export interface NotFoundPageProps {
    user?: User | null;
    signInComponent?: JSX.Element;
    onBack: () => void;
    onSignOut: () => void;
}
export declare const NoPermissionOrNotFound: ({ user, onBack, onSignOut, signInComponent, }: NotFoundPageProps) => import("react/jsx-runtime").JSX.Element;
export declare const NotFoundPage: ({ user, onBack, onSignOut, }: NotFoundPageProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=not-found-page.d.ts.map