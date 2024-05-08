import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";
import { createInstance } from "i18next";
import { renderToString } from "react-dom/server";
import { I18nextProvider, I18nextProviderProps, initReactI18next } from "react-i18next";
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

  let markup = renderToString(
    <I18nextProvider i18n={instance as I18nextProviderProps['i18n']}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
