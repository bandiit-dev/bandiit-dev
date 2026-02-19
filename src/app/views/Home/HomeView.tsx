import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./style.css";

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
  const howBullets = t("homeHowBullets");
  const heroPrimaryHref = t("homeHeroPrimaryHref");
  const heroSecondaryHref = t("homeHeroSecondaryHref");
  const contactEmail =
    language === "pt-BR" ? COMPANY_INFO.emailPt : COMPANY_INFO.emailEn;

  const plainPhone = COMPANY_INFO.phone.replace(/[^\d]/g, "");
  const whatsappHref = plainPhone ? `https://wa.me/${plainPhone}` : undefined;

  const contactItems = [
    {
      label: t("homeContactEmailLabel"),
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      label: t("homeContactPhoneLabel"),
      value: COMPANY_INFO.phone,
      href: `tel:${COMPANY_INFO.phone}`,
    },
    {
      label: t("homeContactAddressLabel"),
      value: COMPANY_INFO.address,
    },
    {
      label: t("homeContactHoursLabel"),
      value: t("homeContactHoursValue"),
    },
  ];

  return (
    <div className="home-view">
      <Helmet>
        <title>{t("homeSeoTitle")}</title>
        <meta name="description" content={t("homeSeoDescription")} />
      </Helmet>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__content">
          <h1 id="home-hero-title">{t("homeHeroSubtitle")}</h1>
          <p className="home-hero__description">{t("homeHeroDescription")}</p>
          <div className="home-hero__actions">
            <a
              className="btn btn-secondary"
              href={whatsappHref}
              target="_blank"
            >
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
          </div>
          <ul className="home-card-list">
            {services.map((item) => (
              <li key={item} className="home-card">
                <span>{item}</span>
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
            {howBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* <section
        id="contato"
        className="home-section"
        aria-labelledby="home-contact-title"
      >
        <AliasAnchors ids={["contact"]} />
        <div className="home-section__header">
          <p className="eyebrow">{t("navContact")}</p>
          <h2 id="home-contact-title">{t("homeContactTitle")}</h2>
          <p className="home-section__lead">{t("homeContactIntro")}</p>
        </div>
        <div className="home-contact">
          <dl>
            {contactItems.map((item) => (
              <div key={item.label} className="home-contact__item">
                <dt>{item.label}</dt>
                <dd>
                  {item.href ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <a className="btn btn-primary" href={`mailto:${contactEmail}`}>
            {t("homeContactCta")}
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default HomeView;
