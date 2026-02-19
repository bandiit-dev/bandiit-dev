import { Link, Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { AnalyticsTracker } from "../analytics";
import { COMPANY_INFO } from "../constants/company";
import { useTranslation } from "../i18n";

import "./AppLayout.css";

const AppLayout = () => {
  const t = useTranslation();

  const anchorLinks = [
    { to: "/#sobre", label: t("navAbout") },
    { to: "/#servicos", label: t("navServices") },
    { to: "/#como-trabalhamos", label: t("navHow") },
  ];

  return (
    <div className="app-layout">
      <AnalyticsTracker />
      <header className="app-header">
        <Link to="/" className="app-header__brand">
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
