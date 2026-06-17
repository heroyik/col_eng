#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";

const requiredEnvKeys = [
  "PUBLIC_FIREBASE_API_KEY",
  "PUBLIC_FIREBASE_AUTH_DOMAIN",
  "PUBLIC_FIREBASE_PROJECT_ID",
  "PUBLIC_FIREBASE_STORAGE_BUCKET",
  "PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "PUBLIC_FIREBASE_APP_ID",
];

const localEnv = {};
for (const file of [".env", ".env.local"]) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    localEnv[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

const deployProvider = process.env.DEPLOY_PROVIDER ?? "gitlab";
if (deployProvider === "github") {
  console.log("[firebase-env] Bypassing Firebase env validation for GitHub Pages redirect build");
  process.exit(0);
}

const missing = requiredEnvKeys.filter((key) => !(process.env[key] || localEnv[key]));

if (missing.length > 0) {
  for (const key of missing) {
    console.error(`[firebase-env] missing ${key}`);
  }
  process.exit(1);
}

console.log("[firebase-env] Firebase public env is present");
