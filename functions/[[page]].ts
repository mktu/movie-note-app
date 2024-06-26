import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
// @ts-ignore - the server build file is generated by `remix vite:build`
import * as build from "../build/server";
import { getLoadContext } from "../load-context";

if (process.env.NODE_ENV === "development") {
    logDevReady(build as any);
}


const handleRequest = createPagesFunctionHandler({
    build: build as any,
    mode: build.mode,
    getLoadContext
});

export function onRequest(context: EventContext<Env, any, any>) {
    return handleRequest(context);
}
