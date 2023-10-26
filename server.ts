import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { initSessionStorage } from "~/features/auth/server/session";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

const handleRequest = createPagesFunctionHandler({
  build,
  mode: build.mode,
  getLoadContext: (context) => context.env,
});

export function onRequest(context: any) {
  initSessionStorage(context.env)
  return handleRequest(context);
}
