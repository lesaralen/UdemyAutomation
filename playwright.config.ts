import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  
  // Run all tests in parallel.
  //fullyParallel: true,

  testDir: 'tests',
  reporter: [['html', { open: 'on-failure' }]],
  timeout: 60000,
  retries: 0,

  use: {
    headless: false,
    viewport: {width: 1280, height: 720},
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    },

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
     {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

     {
      name: 'webkit',
      use: { ...devices['Desktop webkit'] },
    },
    */
  ],
});