type CreateAdminProps = {
    name: string;
    email: string;
    password: string;
    invalidEmail: boolean;
    invalidPassword: boolean;
    passwordLimits: {
        minLength: number;
        maxLength: number;
    };
    onNameChange: (name: string) => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
};
export declare const CreateAdmin: ({ name, email, password, invalidEmail, invalidPassword, passwordLimits, onNameChange, onEmailChange, onPasswordChange, }: CreateAdminProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=create-admin.d.ts.map