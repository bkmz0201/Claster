import { describe, expect, test } from 'vitest';
import { mobileEffects } from '../view-presets/table/mobile/effect.js';
import { pcEffects } from '../view-presets/table/pc/effect.js';
/** @vitest-environment happy-dom */
describe('TableGroup', () => {
    test('toggle collapse on pc', () => {
        pcEffects();
        const group = document.createElement('affine-data-view-table-group');
        expect(group.collapsed$.value).toBe(false);
        group._toggleCollapse();
        expect(group.collapsed$.value).toBe(true);
        group._toggleCollapse();
        expect(group.collapsed$.value).toBe(false);
    });
    test('toggle collapse on mobile', () => {
        mobileEffects();
        const group = document.createElement('mobile-table-group');
        expect(group.collapsed$.value).toBe(false);
        group._toggleCollapse();
        expect(group.collapsed$.value).toBe(true);
        group._toggleCollapse();
        expect(group.collapsed$.value).toBe(false);
    });
});
//# sourceMappingURL=table-group.unit.spec.js.map