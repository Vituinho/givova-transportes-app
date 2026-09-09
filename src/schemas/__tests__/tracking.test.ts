import { trackingCodeSchema, trackingResultSchema } from '@/schemas/tracking';
import { normalizeTrackingCode } from '@/services/tracking';
import { describe, expect, it } from '@jest/globals';

describe('tracking', () => {
  it('normaliza o código sem criar dados', () => { expect(normalizeTrackingCode('  giv-123  ')).toBe('GIV-123'); });
  it('rejeita código curto', () => { expect(trackingCodeSchema.safeParse('x').success).toBe(false); });
  it('valida o contrato de resposta da API', () => {
    const result = trackingResultSchema.safeParse({ code: 'GIV-123', status: 'Em trânsito', lastUpdatedAt: '2026-09-09T12:00:00Z', events: [] });
    expect(result.success).toBe(true);
  });
});
