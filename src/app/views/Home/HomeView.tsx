import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./style.css";

const BASE_URL = "https://bandiit.dev.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const AliasAnchors = ({ ids }: { ids: string[] }) => (
  <>
    {ids.map((alias) => (
      <span
        key={alias}
        id={alias}
        className="anchor-alias"
        aria-hidden="true"
      />
    ))}
  </>
);

const scrollToHash = (hash: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const HomeView = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    scrollToHash(location.hash.replace(/^#/, ""));
  }, [location]);

  const services = t("homeServicesItems");
  const whoForBullets = t("homeHowBullets");
  const heroPrimaryHref = t("homeHeroPrimaryHref");
  const heroSecondaryHref = t("homeHeroSecondaryHref");

  const canonicalPath = language === "en-US" ? "/en" : "/";
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: COMPANY_INFO.brand,
          url: BASE_URL,
          email: COMPANY_INFO.emailPt,
          telephone: COMPANY_INFO.phone,
        },
        {
          "@type": "ProfessionalService",
          "@id": `${BASE_URL}/#professional-service`,
          name: COMPANY_INFO.brand,
          url: BASE_URL,
          email: COMPANY_INFO.emailPt,
          telephone: COMPANY_INFO.phone,
          areaServed: "BR",
          serviceType: [
            "Criação de sites profissionais",
            "Desenvolvimento de sistemas sob medida",
            "Desenvolvimento web",
            "Integração de sistemas e APIs",
            "Automação de processos empresariais",
            "Manutenção e suporte técnico",
          ],
          provider: { "@id": `${BASE_URL}/#organization` },
        },
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: BASE_URL,
          name: COMPANY_INFO.brand,
          inLanguage: ["pt-BR", "en-US"],
          publisher: { "@id": `${BASE_URL}/#organization` },
        },
        {
          "@type": "Service",
          "@id": `${BASE_URL}/#service`,
          name: "Criação de sites e sistemas para pequenas e médias empresas",
          provider: { "@id": `${BASE_URL}/#organization` },
          areaServed: "BR",
          serviceType: [
            "Criação de sites profissionais",
            "Desenvolvimento de sistemas sob medida",
            "Desenvolvimento web",
            "Integração de sistemas e APIs",
            "Automação de processos empresariais",
            "Manutenção e suporte técnico",
          ],
        },
      ],
    }),
    []
  );

  return (
    <div className="home-view">
      <Helmet>
        <title>{t("homeSeoTitle")}</title>
        <html lang={language} />
        <meta name="description" content={t("homeSeoDescription")} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="en-US" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={language} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={COMPANY_INFO.brand} />
        <meta property="og:title" content={t("homeOgTitle")} />
        <meta property="og:description" content={t("homeOgDescription")} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("homeOgTitle")} />
        <meta name="twitter:description" content={t("homeOgDescription")} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__content">
          <h1 id="home-hero-title">{t("homeHeroSubtitle")}</h1>
          <p className="home-hero__description">{t("homeHeroDescription")}</p>
          <div className="home-hero__actions">
            <a className="btn btn-primary" href={heroPrimaryHref}>
              {t("homeHeroPrimaryCta")}
            </a>
            <a className="btn btn-secondary" href={heroSecondaryHref} target="_blank" rel="noreferrer">
              {t("homeHeroSecondaryCta")}
            </a>
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="home-section"
        aria-labelledby="home-about-title"
      >
        <div className="home-section__content">
          <AliasAnchors ids={["about"]} />
          <div className="home-section__header">
            <p className="eyebrow">{t("navAbout")}</p>
            <h2 id="home-about-title">{t("homeAboutTitle")}</h2>
          </div>
          <div className="home-about__text">
            <p>{t("homeAboutTextOne")}</p>
            <p>{t("homeAboutTextTwo")}</p>
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="home-section"
        aria-labelledby="home-services-title"
      >
        <div className="home-section__content">
          <AliasAnchors ids={["services"]} />
          <div className="home-section__header">
            <p className="eyebrow">{t("navServices")}</p>
            <h2 id="home-services-title">{t("homeServicesTitle")}</h2>
            <p className="home-section__lead">{t("homeServicesIntro")}</p>
          </div>
          <ul className="home-card-list">
            {services.map((item) => (
              <li key={item.title} className="home-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="como-trabalhamos"
        className="home-section home-section--two-column"
        aria-labelledby="home-how-title"
      >
        <div className="home-section__content">
          <AliasAnchors ids={["how-we-work"]} />
          <div>
            <p className="eyebrow">{t("navHow")}</p>
            <h2 id="home-how-title">{t("homeHowTitle")}</h2>
            <p className="home-section__lead">{t("homeHowText")}</p>
          </div>
          <ul className="home-list">
            {whoForBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contato"
        className="home-section"
        aria-labelledby="home-contact-title"
      >
        <div className="home-section__content">
          <AliasAnchors ids={["contact"]} />
          <div className="home-section__header">
            <p className="eyebrow">{t("navContact")}</p>
            <h2 id="home-contact-title">{t("homeContactTitle")}</h2>
            <p className="home-section__lead">{t("homeContactIntro")}</p>
          </div>
          <a className="btn btn-primary" href={heroPrimaryHref}>
            {t("homeContactCta")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
