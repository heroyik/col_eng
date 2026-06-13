import { defineConfig, devices } from "@playwright/test";

const externalBaseURL = process.env.SMOKE_BASE_URL;
const baseURL = externalBaseURL ?? "http://127.0.0.1:4321";

const localFirebaseEnv = [
  "PUBLIC_FIREBASE_API_KEY=test",
  "PUBLIC_FIREBASE_AUTH_DOMAIN=engdb-11b7f.firebaseapp.com",
  "PUBLIC_FIREBASE_PROJECT_ID=engdb-11b7f",
  "PUBLIC_FIREBASE_STORAGE_BUCKET=engdb-11b7f.firebasestorage.app",
  "PUBLIC_FIREBASE_MESSAGING_SENDER_ID=221994477836",
  "PUBLIC_FIREBASE_APP_ID=1:221994477836:web:2344c5b5230a266dd4c129",
  "PUBLIC_FIREBASE_MEASUREMENT_ID=G-QCHLDW446Y",
  "PUBLIC_SITE_URL=http://127.0.0.1:4321",
  "PUBLIC_BASE_PATH=",
].join(" ");

export default defineConfig({
  testDir: "./tests/smoke",
  timeout: 30_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: `${localFirebaseEnv} npm run dev -- --host 127.0.0.1 --port 4321`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
