import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "https://comsolotex-admin.sologenic.org/api",
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: "application/json",
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      Authorization: `${process.env.API_TOKEN}`,
    },
  },
  reporter: [
    ["html", { outputFolder: "playwright-report" }], // HTML reporter
    ["junit", { outputFile: "test-results/results.xml" }], // JUnit reporter
  ],
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // Adjust the number of workers based on your environment
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Tablet Chrome",
      use: { ...devices["Galaxy Tab S4"] },
    },
  ],
});
