/** Minimal in-memory rate limiter for Server Actions / route handlers.
 *  Production: back this with Upstash Redis or Supabase for multi-instance
 *  hosting. In-memory works for single-instance Node (typical Hostinger plan).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || now > rec.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (rec.count >= limit) return false;
  rec.count++;
  return true;
}
