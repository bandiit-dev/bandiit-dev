import { ChangeEvent } from "react";

import { Language, useLanguage, useTranslation } from "../../i18n";

import "./style.css";

const options: Array<{ code: Language; label: string }> = [
  { code: "en-US", label: "EN" },
  { code: "pt-BR", label: "PT" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  const handleClick = (nextLanguage: Language) => () => {
    setLanguage(nextLanguage);
  };

  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t("languageLabel")}
    >
      <div className="language-switcher__options">
        {options.map((option, index) => (
          <div className="language-switcher__item" key={option.code}>
            <button
              type="button"
              className={`language-switcher__button${
                language === option.code ? " is-active" : ""
              }`}
              onClick={handleClick(option.code)}
              aria-pressed={language === option.code}
            >
              {option.label}
            </button>{" "}
            {index < options.length - 1 && (
              <span className="language-switcher__divider" aria-hidden="true">
                |
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
