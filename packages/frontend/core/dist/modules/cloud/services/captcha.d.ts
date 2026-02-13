import { LiveData, Service } from '@toeverything/infra';
import type { ValidatorProvider } from '../provider/validator';
import type { FetchService } from './fetch';
import type { ServerService } from './server';
export declare class CaptchaService extends Service {
    private readonly serverService;
    private readonly fetchService;
    readonly validatorProvider?: ValidatorProvider | undefined;
    needCaptcha$: LiveData<boolean>;
    challenge$: LiveData<string | undefined>;
    isLoading$: LiveData<boolean>;
    verifyToken$: LiveData<string | undefined>;
    error$: LiveData<any>;
    constructor(serverService: ServerService, fetchService: FetchService, validatorProvider?: ValidatorProvider | undefined);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    resetAfter5min: import("@toeverything/infra").Effect<unknown>;
}
//# sourceMappingURL=captcha.d.ts.map