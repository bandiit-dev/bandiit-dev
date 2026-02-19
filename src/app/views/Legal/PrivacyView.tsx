import { Helmet } from "react-helmet-async";

import { useTranslation } from "../../i18n";

import "./legal.css";

const PrivacyView = () => {
  const t = useTranslation();
  const useItems = t("privacyUseItems");

  return (
    <article className="legal-page">
      <Helmet>
        <title>{t("privacySeoTitle")}</title>
        <meta name="description" content={t("privacySeoDescription")} />
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
