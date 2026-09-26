/**
 * Cryptographically Secure Session Service for Kontrol.uz Admin
 * Works in both Node.js and Edge Runtimes (middleware) via Web Crypto API.
 */

export const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Helper: base64url encoding
function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Helper: base64url decoding
function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Helper: import secret key for HMAC-SHA256
async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface SessionPayload {
  email: string;
  role: string;
  exp: number; // Unix timestamp in seconds
}

/**
 * Creates a tamper-proof signed session token
 */
export async function createSessionToken(
  data: { email: string; role: string },
  secret: string,
  expiresInSeconds: number = DEFAULT_EXPIRATION_SECONDS
): Promise<string> {
  const payload: SessionPayload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const payloadStr = JSON.stringify(payload);
  const enc = new TextEncoder();
  const payloadBytes = enc.encode(payloadStr);
  const payloadB64 = base64UrlEncode(payloadBytes.buffer);

  const key = await getKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64)
  );
  const signatureB64 = base64UrlEncode(signatureBuffer);

  return `${payloadB64}.${signatureB64}`;
}

/**
 * Verifies the session token signature and expiration
 */
export async function verifySessionToken(
  token: string | undefined | null,
  secret: string
): Promise<{ valid: boolean; payload?: SessionPayload }> {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signatureB64] = parts;

  try {
    const key = await getKey(secret);
    const enc = new TextEncoder();
    const signatureBytes = base64UrlDecode(signatureB64);

    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as any,
      enc.encode(payloadB64)
    );

    if (!isValidSig) {
      return { valid: false };
    }

    const payloadBytes = base64UrlDecode(payloadB64);
    const dec = new TextDecoder();
    const payloadStr = dec.decode(payloadBytes);
    const payload: SessionPayload = JSON.parse(payloadStr);

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
