import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";
import { createInstance } from "i18next";
import { renderToReadableStream } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next, { lngs } from "./i18next.server";
import i18n from './i18n'; // your i18n configuration file
import resourcesToBackend from "i18next-resources-to-backend";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let instance = createInstance();
  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lngs))
    .init({
      ...i18n,
      lng,
      ns,
    });

  let markup = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
