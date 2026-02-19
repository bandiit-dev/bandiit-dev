import { Helmet } from "react-helmet-async";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./legal.css";

const SupportView = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const contactEmail = language === "pt-BR" ? COMPANY_INFO.emailPt : COMPANY_INFO.emailEn;

  return (
    <article className="legal-page">
      <Helmet>
        <title>{t("supportSeoTitle")}</title>
        <meta name="description" content={t("supportSeoDescription")} />
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
