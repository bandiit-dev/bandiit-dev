import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import React from "react";
import { renderToString } from "react-dom/server";
import helmetAsync from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { createServer } from "vite";

const { HelmetProvider } = helmetAsync;

const DIST_DIR = join(process.cwd(), "dist");
const TEMPLATE_PATH = join(DIST_DIR, "index.html");
const routes = ["/", "/privacy", "/terms", "/support"];

const template = readFileSync(TEMPLATE_PATH, "utf8");

const replaceTitle = (html: string, titleMarkup: string) => {
  if (!titleMarkup) {
    return html;
  }

  if (/<title>[\s\S]*?<\/title>/.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/, titleMarkup);
  }

  return html.replace("</head>", `${titleMarkup}\n</head>`);
};

const injectHeadTags = (html: string, headTags: string) => {
  if (!headTags) {
    return html;
  }

  return html.replace("</head>", `${headTags}\n</head>`);
};

type HelmetContext = {
  helmet?: {
    title?: { toString: () => string };
    meta?: { toString: () => string };
    link?: { toString: () => string };
    script?: { toString: () => string };
  };
};

const renderRoute = (
  route: string,
  App: React.ComponentType,
  LanguageProvider: React.ComponentType<{ children: React.ReactNode }>
) => {
  const helmetContext: HelmetContext = {};

  const appMarkup = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={route}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext?.helmet;
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appMarkup}</div>`
  );

  if (helmet) {
    html = replaceTitle(html, helmet.title?.toString() ?? "");
    const additionalHead = [
      helmet.meta?.toString(),
      helmet.link?.toString(),
      helmet.script?.toString(),
    ]
      .filter(Boolean)
      .join("\n");

    html = injectHeadTags(html, additionalHead);
  }

  const outputPath =
    route === "/"
      ? join(DIST_DIR, "index.html")
      : join(DIST_DIR, route.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, "utf8");
  console.log(`Prerendered ${route} -> ${outputPath}`);
};

const main = async () => {
  const vite = await createServer({
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const [{ default: App }, { LanguageProvider }] = await Promise.all([
      vite.ssrLoadModule("/src/app/App.tsx"),
      vite.ssrLoadModule("/src/app/i18n/index.ts"),
    ]);

    routes.forEach((route) => renderRoute(route, App, LanguageProvider));
  } finally {
    await vite.close();
  }
};

main().catch((error) => {
  console.error("Prerender failed", error);
  process.exitCode = 1;
});
