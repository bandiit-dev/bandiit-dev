const sanitizePlaceholder = (value: string, fallback: string) => {
  if (!value || /_AQUI|PLACEHOLDER|TODO/i.test(value)) {
    return fallback;
  }

  return value;
};

export const COMPANY_INFO = {
  brand: "Bandiit.dev",
  legalName: sanitizePlaceholder("Bandiit.dev", "Bandiit.dev"),
  cnpj: "49.688.273/0001-60",
  address: sanitizePlaceholder("", "Atendimento remoto em todo o Brasil"),
  phone: "+55 21 97134-0128",
  emailPt: "contato@bandiit.dev.br",
  emailEn: "contato@bandiit.dev.br",
  emailPrivacy: "contato@bandiit.dev.br",
} as const;
