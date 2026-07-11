export const getRequiredEnv = (keys: string[]): string => {
    for (const key of keys) {
        const value = process.env[key];
        if (value && value.trim().length > 0) {
            return value.trim();
        }
    }

    throw new Error(`Missing required environment variable. Provide one of: ${keys.join(', ')}`);
};

export const getLoginCredentials = (): { username: string; password: string } => ({
    username: getRequiredEnv(['LOGIN_USERNAME', 'USERNAME']),
    password: getRequiredEnv(['LOGIN_PASSWORD', 'PASSWORD'])
});

export const getBaseUrl = (): string => process.env.BASE_URL?.trim() || 'https://team40.qaaerp.com';
