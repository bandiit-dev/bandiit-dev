import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGithubAlt,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { COMPANY_INFO } from "../../constants/company";
import { useLanguage, useTranslation } from "../../i18n";

import "./style.css";

const Footer = () => {
  const t = useTranslation();
  const { language } = useLanguage();

  const contactEmail =
    language === "pt-BR" ? COMPANY_INFO.emailPt : COMPANY_INFO.emailEn;
  const plainPhone = COMPANY_INFO.phone.replace(/[^\d]/g, "");
  const whatsappHref = plainPhone ? `https://wa.me/${plainPhone}` : undefined;

  const links = [
    { to: "/privacy", label: t("navPrivacy") },
    { to: "/terms", label: t("navTerms") },
    { to: "/support", label: t("navSupport") },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__info">
        <p>CNPJ {COMPANY_INFO.cnpj}</p>
        {/* <p>
          {t("footerAddressLabel")}: {COMPANY_INFO.address}
        </p> */}
        <p>
          <a href={`mailto:${contactEmail}`}>
            <FontAwesomeIcon icon={faEnvelope} /> {contactEmail}
          </a>{" "}
          |{" "}
          <a href={`tel:${COMPANY_INFO.phone}`}>
            <FontAwesomeIcon icon={faPhone} /> {COMPANY_INFO.phone}
          </a>
          {whatsappHref ? (
            <>
              {" "}
              |{" "}
              <a href={whatsappHref}>
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </>
          ) : null}
          <>
            {" "}
            |{" "}
            <a href={"https://github.com/bandiit-dev"}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </>
        </p>
        {/* <p>
          {t("footerPrivacyLabel")}:{" "}
          <a href={`mailto:${COMPANY_INFO.emailPrivacy}`}>
            {COMPANY_INFO.emailPrivacy}
          </a>
        </p> */}
      </div>
      <nav className="site-footer__links" aria-label={t("footerLinksLabel")}>
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
