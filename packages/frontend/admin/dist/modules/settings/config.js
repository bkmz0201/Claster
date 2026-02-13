import { upperFirst } from 'lodash-es';
import CONFIG_DESCRIPTORS from '../../config.json';
import { SendTestEmail } from './operations/send-test-email';
const IGNORED_MODULES = [];
if (environment.isSelfHosted) {
    IGNORED_MODULES.push('payment');
}
const ALL_CONFIGURABLE_MODULES = Object.keys(CONFIG_DESCRIPTORS).filter(key => !IGNORED_MODULES.includes(key));
export const KNOWN_CONFIG_GROUPS = [
    {
        name: 'Server',
        module: 'server',
        fields: ['externalUrl', 'name', 'hosts'],
    },
    {
        name: 'Auth',
        module: 'auth',
        fields: [
            'allowSignup',
            'allowSignupForOauth',
            // nested json object
            {
                key: 'passwordRequirements',
                sub: 'min',
                type: 'Number',
                desc: 'Minimum length requirement of password',
            },
            {
                key: 'passwordRequirements',
                sub: 'max',
                type: 'Number',
                desc: 'Maximum length requirement of password',
            },
        ],
    },
    {
        name: 'Notification',
        module: 'mailer',
        fields: [
            'SMTP.name',
            'SMTP.host',
            'SMTP.port',
            'SMTP.username',
            'SMTP.password',
            'SMTP.ignoreTLS',
            'SMTP.sender',
        ],
        operations: [SendTestEmail],
    },
    {
        name: 'Storage',
        module: 'storages',
        fields: [
            {
                key: 'blob.storage',
                desc: 'The storage provider for user uploaded blobs',
                sub: 'provider',
                type: 'Enum',
                options: ['fs', 'aws-s3', 'cloudflare-r2'],
            },
            {
                key: 'blob.storage',
                sub: 'bucket',
                type: 'String',
                desc: 'The bucket name for user uploaded blobs storage',
            },
            {
                key: 'blob.storage',
                sub: 'config',
                type: 'JSON',
                desc: 'The config passed directly to the storage provider(e.g. aws-sdk)',
            },
            {
                key: 'avatar.storage',
                desc: 'The storage provider for user avatars',
                sub: 'provider',
                type: 'Enum',
                options: ['fs', 'aws-s3', 'cloudflare-r2'],
            },
            {
                key: 'avatar.storage',
                sub: 'bucket',
                type: 'String',
                desc: 'The bucket name for user avatars storage',
            },
            {
                key: 'avatar.storage',
                sub: 'config',
                type: 'JSON',
                desc: 'The config passed directly to the storage provider(e.g. aws-sdk)',
            },
            {
                key: 'avatar.publicPath',
                type: 'String',
                desc: 'The public path prefix for user avatars(e.g. https://my-bucket.s3.amazonaws.com/)',
            },
        ],
    },
    {
        name: 'OAuth',
        module: 'oauth',
        fields: ['providers.google', 'providers.github', 'providers.oidc'],
    },
    {
        name: 'AI',
        module: 'copilot',
        fields: [
            'enabled',
            'scenarios',
            'providers.openai',
            'providers.gemini',
            'providers.perplexity',
            'providers.anthropic',
            'providers.fal',
            'unsplash',
            'exa',
            {
                key: 'storage',
                desc: 'The storage provider for copilot blobs',
                sub: 'provider',
                type: 'Enum',
                options: ['fs', 'aws-s3', 'cloudflare-r2'],
            },
            {
                key: 'storage',
                sub: 'bucket',
                type: 'String',
                desc: 'The bucket name for copilot blobs storage',
            },
            {
                key: 'storage',
                sub: 'config',
                type: 'JSON',
                desc: 'The config passed directly to the storage provider(e.g. aws-sdk)',
            },
        ],
    },
];
export const UNKNOWN_CONFIG_GROUPS = ALL_CONFIGURABLE_MODULES.filter(module => !KNOWN_CONFIG_GROUPS.some(group => group.module === module)).map(module => ({
    name: upperFirst(module),
    module,
    // @ts-expect-error allow
    fields: Object.keys(CONFIG_DESCRIPTORS[module]),
    operations: undefined,
}));
export const ALL_SETTING_GROUPS = [
    ...KNOWN_CONFIG_GROUPS,
    ...UNKNOWN_CONFIG_GROUPS,
];
export const ALL_CONFIG_DESCRIPTORS = CONFIG_DESCRIPTORS;
//# sourceMappingURL=config.js.map