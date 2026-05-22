import { Helmet } from "react-helmet-async";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./legal.css";

const BASE_URL = "https://bandiit.dev.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const PrivacyView = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const useItems = t("privacyUseItems");
  const canonicalPath = language === "en-US" ? "/en/privacy" : "/privacidade";
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const title = t("privacySeoTitle");
  const description = t("privacySeoDescription");

  return (
    <article className="legal-page">
      <Helmet>
        <title>{title}</title>
        <html lang={language} />
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={language} />
        <meta property="og:site_name" content={COMPANY_INFO.brand} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>
      <h1>{t("privacyTitle")}</h1>
      <p>{t("privacyIntro")}</p>

      <section className="legal-page__section">
        <h2>{t("privacyUseTitle")}</h2>
        <ul>
          {useItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="legal-page__section">
        <h2>{t("privacyShareTitle")}</h2>
        <p>{t("privacyShareText")}</p>
      </section>

      <section className="legal-page__section">
        <h2>{t("privacyRightsTitle")}</h2>
        <p>{t("privacyRightsText")}</p>
      </section>

      <section className="legal-page__section">
        <h2>{t("privacyContactTitle")}</h2>
        <p>{t("privacyContactText")}</p>
      </section>
    </article>
  );
};

export default PrivacyView;
