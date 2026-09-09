import { quoteSchema } from '@/schemas/quote';
import { describe, expect, it } from '@jest/globals';

const validQuote = {
  originCity: 'São Paulo', originState: 'SP', destinationCity: 'Curitiba', destinationState: 'PR', cargoType: 'Equipamentos', weight: '250 kg', volumes: '4', dimensions: '120 x 80 x 90 cm', invoiceValue: '15000', collectionDate: '20/09/2026', name: 'Cliente Teste', company: 'Empresa Teste', email: 'cliente@empresa.com.br', phone: '1133334444', whatsapp: '11999998888', notes: '', acceptPrivacy: true,
};

describe('quoteSchema', () => {
  it('aceita uma solicitação completa', () => { expect(quoteSchema.safeParse(validQuote).success).toBe(true); });
  it('exige consentimento de privacidade', () => {
    const result = quoteSchema.safeParse({ ...validQuote, acceptPrivacy: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.acceptPrivacy).toContain('Aceite a Política de Privacidade para continuar.');
  });
  it('rejeita e-mail e UFs inválidos', () => {
    const result = quoteSchema.safeParse({ ...validQuote, email: 'invalido', originState: 'São Paulo' });
    expect(result.success).toBe(false);
    if (!result.success) { expect(result.error.flatten().fieldErrors.email).toBeDefined(); expect(result.error.flatten().fieldErrors.originState).toBeDefined(); }
  });
});
