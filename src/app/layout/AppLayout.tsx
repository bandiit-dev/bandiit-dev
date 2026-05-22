import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Footer } from "../components/Footer";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { AnalyticsTracker } from "../analytics";
import { COMPANY_INFO } from "../constants/company";
import {
  detectLanguageFromPath,
  getLocalizedHomePath,
  useLanguage,
  useTranslation,
} from "../i18n";

import "./AppLayout.css";

const AppLayout = () => {
  const t = useTranslation();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const pathLanguage = detectLanguageFromPath(location.pathname);
    if (pathLanguage !== language) {
      setLanguage(pathLanguage);
    }
  }, [language, location.pathname, setLanguage]);

  const homePath = getLocalizedHomePath(language);

  const anchorLinks = [
    { to: `${homePath}#sobre`, label: t("navAbout") },
    { to: `${homePath}#servicos`, label: t("navServices") },
    { to: `${homePath}#como-trabalhamos`, label: t("navHow") },
  ];

  return (
    <div className="app-layout">
      <AnalyticsTracker />
      <header className="app-header">
        <Link to={homePath} className="app-header__brand">
          {COMPANY_INFO.brand}
        </Link>
        <nav className="app-header__nav" aria-label="Main navigation">
          {anchorLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="app-header__actions">
          <LanguageSwitcher />
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
