import { Language } from "./translations";

const EN_PREFIX = "/en";

const PT_TO_EN_PATHS: Record<string, string> = {
  "/": "/en",
  "/privacidade": "/en/privacy",
  "/termos": "/en/terms",
  "/suporte": "/en/support",
  "/contato": "/en/get-in-touch",
  "/privacy": "/en/privacy",
  "/terms": "/en/terms",
  "/support": "/en/support",
  "/get-in-touch": "/en/get-in-touch",
};

const EN_TO_PT_PATHS: Record<string, string> = {
  "/en": "/",
  "/en/privacy": "/privacidade",
  "/en/terms": "/termos",
  "/en/support": "/suporte",
  "/en/get-in-touch": "/contato",
};

const normalizePath = (pathname: string) => {
  if (!pathname) {
    return "/";
  }

  return pathname.replace(/\/$/, "") || "/";
};

export const detectLanguageFromPath = (pathname: string): Language => {
  const normalized = normalizePath(pathname);
  return normalized === EN_PREFIX || normalized.startsWith(`${EN_PREFIX}/`)
    ? "en-US"
    : "pt-BR";
};

export const localizePath = (pathname: string, targetLanguage: Language) => {
  const normalized = normalizePath(pathname);

  if (targetLanguage === "en-US") {
    return PT_TO_EN_PATHS[normalized] ?? "/en";
  }

  return EN_TO_PT_PATHS[normalized] ?? "/";
};

export const getLocalizedLegalPaths = (language: Language) => {
  if (language === "en-US") {
    return {
      privacy: "/en/privacy",
      terms: "/en/terms",
      support: "/en/support",
    };
  }

  return {
    privacy: "/privacidade",
    terms: "/termos",
    support: "/suporte",
  };
};

export const getLocalizedHomePath = (language: Language) =>
  language === "en-US" ? "/en" : "/";

export const getLocalizedContactPath = (language: Language) =>
  language === "en-US" ? "/en/get-in-touch" : "/contato";
