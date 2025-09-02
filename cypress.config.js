import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress_test/support/e2e.js',
    specPattern: 'cypress_test/e2e/**/*.cy.js',
    videosFolder: 'cypress_test/videos',
    screenshotsFolder: 'cypress_test/screenshots',
    downloadsFolder: 'cypress_test/downloads',
    fixturesFolder: 'cypress_test/fixtures',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    supportFile: 'cypress_test/support/component.js',
    specPattern: 'cypress_test/component/**/*.cy.js',
  },
})
