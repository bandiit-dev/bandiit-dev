import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  ContactFormErrors,
  ContactFormInput,
  validateContactForm,
} from "../../contact/validation";
import { useLanguage, useTranslation } from "../../i18n";

import "../Legal/legal.css";
import "./style.css";

const BASE_URL = "https://bandiit.dev.br";

const ContactView = () => {
  const t = useTranslation();
  const { language } = useLanguage();

  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [feedback, setFeedback] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canonicalPath = language === "en-US" ? "/en/get-in-touch" : "/contato";
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const getErrorMessage = (field: keyof ContactFormErrors) => {
    const error = fieldErrors[field];
    if (!error) return "";

    if (field === "name") {
      return error === "required"
        ? t("contactFormNameRequired")
        : t("contactFormNameMin");
    }

    if (field === "email") {
      return error === "required"
        ? t("contactFormEmailRequired")
        : t("contactFormEmailInvalid");
    }

    if (field === "website") {
      return t("contactFormWebsiteInvalid");
    }

    return error === "required"
      ? t("contactFormMessageRequired")
      : t("contactFormMessageMin");
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactFormInput = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      website: String(formData.get("website") ?? ""),
      message: String(formData.get("message") ?? ""),
      preferredContactMethod: String(formData.get("preferredContactMethod") ?? ""),
    };

    const validation = validateContactForm(payload);
    setFieldErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          locale: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setFeedback("success");
      setFieldErrors({});
      form.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      setFeedback("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="legal-page contact-page">
      <Helmet>
        <title>{t("contactSeoTitle")}</title>
        <html lang={language} />
        <meta name="description" content={t("contactSeoDescription")} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <h1>{t("contactFormTitle")}</h1>
      <p>{t("contactFormDescription")}</p>

      <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
        <div className="contact-form__grid">
          <div className="contact-form__field">
            <label htmlFor="contact-name">{t("contactFormNameLabel")}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            />
            {fieldErrors.name ? (
              <p id="contact-name-error" className="contact-form__error">
                {getErrorMessage("name")}
              </p>
            ) : null}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-email">{t("contactFormEmailLabel")}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            />
            {fieldErrors.email ? (
              <p id="contact-email-error" className="contact-form__error">
                {getErrorMessage("email")}
              </p>
            ) : null}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-company">{t("contactFormCompanyLabel")}</label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" />
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-website">{t("contactFormWebsiteLabel")}</label>
            <input
              id="contact-website"
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://"
              aria-invalid={Boolean(fieldErrors.website)}
              aria-describedby={fieldErrors.website ? "contact-website-error" : undefined}
            />
            {fieldErrors.website ? (
              <p id="contact-website-error" className="contact-form__error">
                {getErrorMessage("website")}
              </p>
            ) : null}
          </div>
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-message">{t("contactFormMessageLabel")}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder={t("contactFormMessagePlaceholder")}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" className="contact-form__error">
              {getErrorMessage("message")}
            </p>
          ) : null}
        </div>

        <div className="contact-form__honeypot" aria-hidden="true">
          <label htmlFor="preferred-contact-method">Preferred contact method</label>
          <input
            id="preferred-contact-method"
            name="preferredContactMethod"
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {feedback === "success" ? (
          <p
            className="contact-form__feedback contact-form__feedback--success"
            role="status"
            aria-live="polite"
          >
            {t("contactFormSuccess")}
          </p>
        ) : null}
        {feedback === "error" ? (
          <p className="contact-form__feedback contact-form__feedback--error" role="alert">
            {t("contactFormError")}
          </p>
        ) : null}

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("contactFormSubmitting") : t("contactFormSubmit")}
        </button>
      </form>
    </article>
  );
};

export default ContactView;
