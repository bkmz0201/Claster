import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
export declare const emailRegex: RegExp;
interface PasswordLimits {
    minLength: number;
    maxLength: number;
}
export declare const validateEmailAndPassword: (email: string, password: string, passwordLimits: PasswordLimits, setInvalidEmail?: (invalid: boolean) => void, setInvalidPassword?: (invalid: boolean) => void) => boolean;
export {};
//# sourceMappingURL=utils.d.ts.map