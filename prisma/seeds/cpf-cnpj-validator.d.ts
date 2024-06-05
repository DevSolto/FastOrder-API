declare module 'cpf-cnpj-validator' {
  export const cpf: {
    isValid(cpf: string): boolean;
    format(cpf: string): string;
    strip(cpf: string): string;
    generate(): string;
  };

  export const cnpj: {
    isValid(cnpj: string): boolean;
    format(cnpj: string): string;
    strip(cnpj: string): string;
    generate(): string;
  };
}
