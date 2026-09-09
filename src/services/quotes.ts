import { env } from '@/config/env';
import { quoteSchema, type QuoteFormData } from '@/schemas/quote';
import { apiRequest, IntegrationUnavailableError } from '@/services/api';

export type QuoteResponse = { protocol?: string; receivedAt: string };

export interface QuoteService {
  requestQuote(data: QuoteFormData): Promise<QuoteResponse>;
}

export const quoteService: QuoteService = {
  async requestQuote(data) {
    const payload = quoteSchema.parse(data);
    if (!env.apiUrl) throw new IntegrationUnavailableError('Envio de cotação');
    return apiRequest<QuoteResponse>('/v1/quotes', { method: 'POST', body: JSON.stringify(payload) });
  },
};
