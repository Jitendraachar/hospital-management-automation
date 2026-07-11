import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 30000,

  retries: 1,

  use: {

    baseURL: 'http://localhost:3000',

    browserName: 'chromium',

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 30000

  },

  reporter: [

    ['html'],

    ['list']

  ],

  projects: [

    {

      name: 'Chromium',

      use: { ...devices['Desktop Chrome'] }

    }

  ]

});