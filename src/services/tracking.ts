import { env } from '@/config/env';
import { apiRequest, IntegrationUnavailableError } from '@/services/api';
import { trackingCodeSchema, trackingResultSchema, type TrackingResult } from '@/schemas/tracking';

export interface TrackingService {
  trackShipment(code: string): Promise<TrackingResult>;
}

export const normalizeTrackingCode = (code: string) => code.trim().toUpperCase();

export const trackingService: TrackingService = {
  async trackShipment(code) {
    const normalizedCode = normalizeTrackingCode(trackingCodeSchema.parse(code));
    if (!env.apiUrl) throw new IntegrationUnavailableError('Rastreamento');
    const response = await apiRequest<unknown>(`/v1/shipments/${encodeURIComponent(normalizedCode)}`);
    return trackingResultSchema.parse(response);
  },
};
