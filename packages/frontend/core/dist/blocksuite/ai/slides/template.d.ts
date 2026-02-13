export type PPTSection = {
    title: string;
    content: string;
    keywords: string;
};
export type TemplateImage = {
    id: string;
    url: string;
};
type DocTemplate = {
    images: TemplateImage[];
    content: unknown;
};
export type PPTDoc = {
    isCover: boolean;
    title: string;
    sections: PPTSection[];
};
export declare const basicTheme: (doc: PPTDoc) => Promise<DocTemplate>;
export {};
//# sourceMappingURL=template.d.ts.map