import { z } from 'zod';

const required = (label: string) => z.string().trim().min(1, `${label} é obrigatório.`);

export const quoteSchema = z.object({
  originCity: required('Cidade de origem'),
  originState: required('Estado de origem').length(2, 'Use a sigla do estado com 2 letras.'),
  destinationCity: required('Cidade de destino'),
  destinationState: required('Estado de destino').length(2, 'Use a sigla do estado com 2 letras.'),
  cargoType: required('Tipo da carga'),
  weight: required('Peso'),
  volumes: required('Quantidade de volumes'),
  dimensions: z.string().trim().max(120, 'Use no máximo 120 caracteres.'),
  invoiceValue: required('Valor aproximado da NF'),
  collectionDate: required('Data prevista para coleta'),
  name: required('Nome').min(2, 'Informe seu nome completo.'),
  company: required('Empresa'),
  email: z.string().trim().email('Digite um e-mail válido.'),
  phone: required('Telefone').min(8, 'Digite um telefone válido.'),
  whatsapp: z.string().trim().max(24, 'Digite um WhatsApp válido.'),
  notes: z.string().trim().max(1000, 'Use no máximo 1.000 caracteres.'),
  acceptPrivacy: z.boolean().refine(Boolean, 'Aceite a Política de Privacidade para continuar.'),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export const quoteStepFields: (keyof QuoteFormData)[][] = [
  ['originCity', 'originState', 'destinationCity', 'destinationState'],
  ['cargoType', 'weight', 'volumes', 'invoiceValue', 'collectionDate'],
  ['name', 'company', 'email', 'phone'],
  ['notes', 'acceptPrivacy'],
];
