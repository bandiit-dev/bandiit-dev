import { Helmet } from "react-helmet-async";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./legal.css";

const BASE_URL = "https://bandiit.dev.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const SupportView = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const contactEmail = language === "pt-BR" ? COMPANY_INFO.emailPt : COMPANY_INFO.emailEn;
  const canonicalUrl = `${BASE_URL}/support`;
  const title = t("supportSeoTitle");
  const description = t("supportSeoDescription");

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
      <h1>{t("supportTitle")}</h1>
      <p>{t("supportIntro")}</p>
      <section className="legal-page__section">
        <p>
          {t("supportEmailLabel")}: {" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <p>{t("supportNote")}</p>
      </section>
    </article>
  );
};

export default SupportView;
