import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { initSessionStorage } from "~/features/auth/server/session";


const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
});

export function onRequest(context: any) {
  initSessionStorage(context.env)
  return handleRequest(context);
}
