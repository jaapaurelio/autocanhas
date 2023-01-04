// playwright.config.ts
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000/",
    testIdAttribute: "data-pw",
  },
};
export default config;
