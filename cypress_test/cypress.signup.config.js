import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress_test/support/e2e.js',
    specPattern: 'cypress_test/e2e/signup.cy.js', // Solo test signup
    videosFolder: 'cypress_test/videos',
    screenshotsFolder: 'cypress_test/screenshots',
    downloadsFolder: 'cypress_test/downloads',
    fixturesFolder: 'cypress_test/fixtures',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000, // Aumentato per test signup
    requestTimeout: 15000,
    responseTimeout: 15000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    
    // Configurazioni specifiche per test signup
    env: {
      testType: 'signup',
      maxRetries: 2,
      slowTestThreshold: 10000
    },
    
    // Retry per test instabili
    retries: {
      runMode: 1,
      openMode: 0
    }
  },
  
  // Configurazione per componenti (non utilizzata per signup)
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    supportFile: 'cypress_test/support/component.js',
    specPattern: 'cypress_test/component/**/*.cy.js',
  },
})
