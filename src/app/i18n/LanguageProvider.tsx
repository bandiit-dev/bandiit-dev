import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Language,
  TranslationKey,
  TranslationShape,
  translations,
} from "./translations";

const LANGUAGE_STORAGE_KEY = "bandiit.language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <K extends TranslationKey>(key: K) => TranslationShape[K];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en-US";
  }

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as
    | Language
    | null;

  return saved && saved in translations ? saved : "en-US";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const translate = <K extends TranslationKey>(key: K) =>
      translations[language][key];

    return {
      language,
      setLanguage,
      t: translate,
    };
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

export const useTranslation = () => {
  const { t } = useLanguage();
  return t;
};
