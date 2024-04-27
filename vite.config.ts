import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from './load-context'

installGlobals();

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext
    }),
    remix(),
    tsconfigPaths()
  ],
  ssr: {
    noExternal: ["remix-i18next"],// https://github.com/sergiodxa/remix-i18next/issues/161
  },
});
