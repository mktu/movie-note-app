import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from './load-context'

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext
    }),
    remix(),
    tsconfigPaths()
  ],
  publicDir: 'public',
  ssr: {
    noExternal: ["remix-i18next"],// https://github.com/sergiodxa/remix-i18next/issues/161
  },
});
