import { NextRequest } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting
const store = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((record, key) => {
      // Remove timestamps older than 15 minutes
      record.timestamps = record.timestamps.filter((ts: number) => now - ts < 15 * 60 * 1000);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * Extracts client IP address safely from request headers
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Checks if a given identifier exceeds the rate limit in a rolling time window.
 * 
 * @param identifier Unique key (e.g. "admin-login:192.168.1.1")
 * @param maxRequests Maximum allowed requests in window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  let record = store.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    store.set(identifier, record);
  }

  // Filter out timestamps outside the rolling window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    return {
      success: false,
      remaining: 0,
      resetTime,
    };
  }

  record.timestamps.push(now);
  return {
    success: true,
    remaining: maxRequests - record.timestamps.length,
    resetTime: now + windowMs,
  };
}
