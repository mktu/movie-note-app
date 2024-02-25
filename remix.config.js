/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm", // default value in 2.x, can be removed once upgraded
  serverPlatform: "neutral",
  server: "./server.ts",
  ignoredRouteFiles: ["**/.*"],
  browserNodeBuiltinsPolyfill: { modules: { events: true, util: true } },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
};
