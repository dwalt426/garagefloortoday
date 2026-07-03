/** Structured logging + error capture. Swap the sink for Sentry/Axiom in prod
 *  by setting the transport; interface stays constant so call sites never change.
 */
type Level = "info" | "warn" | "error";
interface LogEntry { level: Level; msg: string; meta?: Record<string, unknown>; ts: string; }

function emit(entry: LogEntry) {
  // Production: POST to Sentry/Axiom/Logtail. Dev: structured console.
  const line = JSON.stringify(entry);
  if (entry.level === "error") console.error(line);
  else if (entry.level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  info: (msg: string, meta?: Record<string, unknown>) => emit({ level: "info", msg, meta, ts: new Date().toISOString() }),
  warn: (msg: string, meta?: Record<string, unknown>) => emit({ level: "warn", msg, meta, ts: new Date().toISOString() }),
  error: (msg: string, meta?: Record<string, unknown>) => emit({ level: "error", msg, meta, ts: new Date().toISOString() }),
};

/** Wrap a Server Action so unexpected throws are logged, not swallowed. */
export async function withLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
  try { return await fn(); }
  catch (e) {
    log.error(`action_failed:${name}`, { error: e instanceof Error ? e.message : String(e) });
    throw e;
  }
}
