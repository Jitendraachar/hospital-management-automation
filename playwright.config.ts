import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: './tests',

  timeout: 30000,

  retries: 1,

  use: {

    baseURL: process.env.BASE_URL || 'https://demo-url.com',

    browserName: 'chromium',

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 30000

  },

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  projects: [

    {

      name: 'Chromium',

      use: { ...devices['Desktop Chrome'] }

    }

  ]

});
