import { z } from 'zod';

export const trackingCodeSchema = z.string().trim().min(3, 'Digite um código de rastreamento válido.').max(80, 'Código muito longo.');

export const trackingEventSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  occurredAt: z.string(),
  completed: z.boolean(),
});

export const trackingResultSchema = z.object({
  code: z.string(),
  status: z.string(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  lastUpdatedAt: z.string(),
  estimatedDeliveryAt: z.string().optional(),
  events: z.array(trackingEventSchema),
});

export type TrackingResult = z.infer<typeof trackingResultSchema>;
