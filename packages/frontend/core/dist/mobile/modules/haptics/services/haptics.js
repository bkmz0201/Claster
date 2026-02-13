import { Service } from '@toeverything/infra';
export class HapticsService extends Service {
    constructor(provider) {
        super();
        this.provider = provider;
    }
    impact(options) {
        this.provider?.impact?.(options)?.catch(console.error);
    }
    notification(options) {
        this.provider?.notification?.(options)?.catch(console.error);
    }
    vibrate(options) {
        this.provider?.vibrate?.(options)?.catch(console.error);
    }
    selectionStart() {
        this.provider?.selectionStart?.().catch(console.error);
    }
    selectionChanged() {
        this.provider?.selectionChanged?.().catch(console.error);
    }
    selectionEnd() {
        this.provider?.selectionEnd?.().catch(console.error);
    }
}
//# sourceMappingURL=haptics.js.map