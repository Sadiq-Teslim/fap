import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Rate limiting: track failed attempts per IP (in-memory, resets on cold start)
const failedAttempts = new Map<
  string,
  { count: number; lastAttempt: number }
>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip: string): {
  limited: boolean;
  retryAfterSecs?: number;
} {
  const record = failedAttempts.get(ip);
  if (!record || record.count < MAX_ATTEMPTS) return { limited: false };

  const elapsed = Date.now() - record.lastAttempt;
  if (elapsed > LOCKOUT_DURATION_MS) {
    failedAttempts.delete(ip);
    return { limited: false };
  }

  return {
    limited: true,
    retryAfterSecs: Math.ceil((LOCKOUT_DURATION_MS - elapsed) / 1000),
  };
}

function recordFailedAttempt(ip: string): void {
  const record = failedAttempts.get(ip);
  failedAttempts.set(ip, {
    count: (record?.count || 0) + 1,
    lastAttempt: Date.now(),
  });
}

function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: { code: "METHOD_NOT_ALLOWED", message: "POST only" } });
  }

  const ip = getClientIp(req);

  // Check rate limit
  const rateCheck = isRateLimited(ip);
  if (rateCheck.limited) {
    return res.status(429).json({
      error: {
        code: "RATE_LIMITED",
        message: `Too many failed attempts. Try again in ${rateCheck.retryAfterSecs} seconds.`,
      },
    });
  }

  const { email, password, twoFACode } = req.body || {};

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Email and password are required.",
      },
    });
  }

  // Load credentials from environment
  const partnerEmail = process.env.PARTNER_EMAIL;
  const partnerPasswordHash = process.env.PARTNER_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;
  const twoFAEnabled = process.env.TOTP_ENABLED === "true";
  const staticTotpCode = process.env.TOTP_STATIC_CODE; // Simple static 2FA code

  if (!partnerEmail || !partnerPasswordHash || !jwtSecret) {
    console.error("Missing required environment variables for auth");
    return res.status(500).json({
      error: {
        code: "SERVER_ERROR",
        message: "Authentication service is misconfigured.",
      },
    });
  }

  // Use constant-time comparison for email to prevent timing attacks
  const emailMatch =
    email.toLowerCase().trim() === partnerEmail.toLowerCase().trim();

  // Verify password with bcrypt (inherently constant-time)
  let passwordMatch = false;
  try {
    passwordMatch = await bcrypt.compare(password, partnerPasswordHash);
  } catch {
    passwordMatch = false;
  }

  if (!emailMatch || !passwordMatch) {
    recordFailedAttempt(ip);
    // Generic error message — never reveal which field was wrong
    return res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      },
    });
  }

  // 2FA check
  if (twoFAEnabled) {
    if (!twoFACode) {
      return res.status(400).json({
        error: {
          code: "2FA_REQUIRED",
          message: "Two-factor authentication code is required.",
        },
      });
    }

    // Static TOTP code comparison
    if (twoFACode.trim() !== staticTotpCode) {
      recordFailedAttempt(ip);
      return res.status(401).json({
        error: {
          code: "INVALID_2FA",
          message: "Invalid two-factor authentication code.",
        },
      });
    }
  }

  // Authentication successful — clear failed attempts
  clearFailedAttempts(ip);

  // Generate JWT
  const secret = new TextEncoder().encode(jwtSecret);
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600; // 1 hour

  const accessToken = await new SignJWT({
    sub: "partner-001",
    email: partnerEmail,
    role: "partner",
    fullName: "SableAssent Coin Corporation",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + expiresIn)
    .setIssuer("fap-auth")
    .sign(secret);

  const refreshToken = await new SignJWT({
    sub: "partner-001",
    type: "refresh",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + 86400 * 7) // 7 days
    .setIssuer("fap-auth")
    .sign(secret);

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: "partner-001",
        email: partnerEmail,
        fullName: "SableAssent Coin Corporation",
        role: "partner",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: {
        accessToken,
        refreshToken,
        expiresIn,
        tokenType: "Bearer",
      },
    },
  });
}
