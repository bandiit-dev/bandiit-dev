import { Helmet } from "react-helmet-async";

import { useTranslation } from "../../i18n";

import "./legal.css";

const TermsView = () => {
  const t = useTranslation();

  return (
    <article className="legal-page">
      <Helmet>
        <title>{t("termsSeoTitle")}</title>
        <meta name="description" content={t("termsSeoDescription")} />
      </Helmet>
      <h1>{t("termsTitle")}</h1>
      <p>{t("termsIntro")}</p>
      <section className="legal-page__section">
        <p>{t("termsOwnershipText")}</p>
        <p>{t("termsLinksText")}</p>
        <p>{t("termsUpdateText")}</p>
      </section>
    </article>
  );
};

export default TermsView;
