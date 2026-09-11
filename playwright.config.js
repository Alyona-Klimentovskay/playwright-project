import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  snapshotDir: './lib/screenshots',
  timeout: process.env.CI ? 60000 : 30000,
  expect: { timeout: 10000 },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['blob']] : [['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com/',
    ...devices['Desktop Chrome'],
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    screenshot: 'retain-on-failure',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test',
    customerEmail: process.env.EXISTING_CUSTOMER_EMAIL,
    customerPassword: process.env.EXISTING_CUSTOMER_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
  },
  projects: [          
    {
      name: 'customer-setup',
      testMatch: '**/customer.setup.js',
      retries: process.env.CI ? 2 : 0,
    },
    {
      name: 'admin-setup',
      testMatch: '**/admin.setup.js',
      timeout: 30000,
      retries: process.env.CI ? 2 : 0,
      expect: {
        timeout: 15000, 
      },
      use: {
        actionTimeout: 10000,     
      }
    },        
    {
      name: 'pure-auth-flows',     
      browserName: 'chromium',
      testIgnore: '**/*account.spec.js',
      testMatch: ['**/user.auth.spec.js', '**/admin.auth.spec.js', '**/contact.spec.js', '**/home.spec.js'],
    },
    {
      name: 'customer-account-validation',
      use: {       
        storageState: 'playwright/.auth/existing-customer.json',                            
      },
      dependencies: ['customer-setup'],
      browserName: 'chromium',
      testMatch: '**/user.account.spec.js',
    },
    {
      name: 'admin-account-validation',
      use: {       
        storageState: 'playwright/.auth/admin.json', 
        actionTimeout: 15000,
        navigationTimeout: 20000,                           
      },
      dependencies: ['admin-setup'], 
      browserName: 'chromium',
      timeout: 60000,
      testMatch: '**/admin.account.spec.js', 
    },

  ],

});



