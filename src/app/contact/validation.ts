export interface ContactFormInput {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  preferredContactMethod: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  website?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateContactForm = (input: ContactFormInput) => {
  const errors: ContactFormErrors = {};

  if (!input.name.trim()) {
    errors.name = "required";
  } else if (input.name.trim().length < 2) {
    errors.name = "min";
  }

  if (!input.email.trim()) {
    errors.email = "required";
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = "invalid";
  }

  if (input.website.trim() && !isValidUrl(input.website.trim())) {
    errors.website = "invalid";
  }

  if (!input.message.trim()) {
    errors.message = "required";
  } else if (input.message.trim().length < 10) {
    errors.message = "min";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
