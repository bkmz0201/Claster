export type ConfigInputProps = {
    field: string;
    desc: string;
    defaultValue: any;
    onChange: (field: string, value: any) => void;
    error?: string;
} & ({
    type: 'String' | 'Number' | 'Boolean' | 'JSON';
} | {
    type: 'Enum';
    options: string[];
});
export declare const ConfigRow: ({ field, desc, type, defaultValue, onChange, error, ...props }: ConfigInputProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=config-input-row.d.ts.map