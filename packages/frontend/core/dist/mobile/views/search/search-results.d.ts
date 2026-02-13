import { type DocCardProps } from '../../components';
import { type UniversalSearchResultItemProps } from '../../components/search-result/universal-item';
export interface SearchResultsProps {
    title: string;
    docs?: DocCardProps['meta'][];
    collections?: UniversalSearchResultItemProps['item'][];
    tags?: UniversalSearchResultItemProps['item'][];
    error?: any;
}
export declare const SearchResults: ({ title, docs, collections, tags, error, }: SearchResultsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=search-results.d.ts.map