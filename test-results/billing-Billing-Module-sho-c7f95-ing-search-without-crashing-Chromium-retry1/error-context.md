# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billing.spec.ts >> Billing Module >> should handle SQL-like payload in billing search without crashing
- Location: tests\billing.spec.ts:64:9

# Error details

```
Error: Missing required environment variable. Provide one of: LOGIN_PASSWORD, PASSWORD
```

# Test source

```ts
  1  | export const getRequiredEnv = (keys: string[]): string => {
  2  |     for (const key of keys) {
  3  |         const value = process.env[key];
  4  |         if (value && value.trim().length > 0) {
  5  |             return value.trim();
  6  |         }
  7  |     }
  8  | 
> 9  |     throw new Error(`Missing required environment variable. Provide one of: ${keys.join(', ')}`);
     |           ^ Error: Missing required environment variable. Provide one of: LOGIN_PASSWORD, PASSWORD
  10 | };
  11 | 
  12 | export const getLoginCredentials = (): { username: string; password: string } => ({
  13 |     username: getRequiredEnv(['LOGIN_USERNAME', 'USERNAME']),
  14 |     password: getRequiredEnv(['LOGIN_PASSWORD', 'PASSWORD'])
  15 | });
  16 | 
  17 | export const getBaseUrl = (): string => process.env.BASE_URL?.trim() || 'https://team40.qaaerp.com';
  18 | 
```