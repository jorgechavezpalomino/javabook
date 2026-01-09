import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  webServer: [
    {
      name: 'frontend',
      command: 'npm start',
      port: 4200,
      timeout: 120_000,
      reuseExistingServer: true,
    },
  ],
});
