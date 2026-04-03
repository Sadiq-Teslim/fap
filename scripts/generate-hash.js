/**
 * Utility to generate bcrypt password hashes for partner credentials.
 *
 * Usage:
 *   node scripts/generate-hash.js "YourSecurePassword123!"
 *
 * Copy the output hash into your .env.local (for dev) or
 * Vercel Environment Variables (for production) as PARTNER_PASSWORD_HASH.
 */

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-hash.js <password>");
  process.exit(1);
}

const SALT_ROUNDS = 12;
const hash = bcrypt.hashSync(password, SALT_ROUNDS);

console.log("\n--- Partner Password Hash ---");
console.log(hash);
console.log("\nAdd this to your environment variables as PARTNER_PASSWORD_HASH");
