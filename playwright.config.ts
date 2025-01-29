import { defineConfig } from "@playwright/test";
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
});
