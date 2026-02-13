import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const emailRegex = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmailAndPassword = (email, password, passwordLimits, setInvalidEmail, setInvalidPassword) => {
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= passwordLimits.minLength &&
        password.length <= passwordLimits.maxLength;
    setInvalidEmail?.(!isValidEmail);
    setInvalidPassword?.(!isValidPassword);
    return isValidEmail && isValidPassword;
};
//# sourceMappingURL=utils.js.map