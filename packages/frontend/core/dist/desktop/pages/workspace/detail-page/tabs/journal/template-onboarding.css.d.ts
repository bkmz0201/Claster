import { keyframes } from '@vanilla-extract/css';
type Timeline = {
    duration: string;
    delay: string;
    easing: string;
    fill?: 'forwards' | 'backwards' | 'both' | 'none';
    keyframes: Parameters<typeof keyframes>[0];
};
/**
 * Timeline for the onboarding animation
 */
export declare const timeline: Record<'container' | 'card' | 'paper', Timeline>;
export declare const container: string;
export declare const card: string;
export declare const title: string;
export declare const close: string;
export declare const menu: string;
export declare const paper: string;
export {};
//# sourceMappingURL=template-onboarding.css.d.ts.map