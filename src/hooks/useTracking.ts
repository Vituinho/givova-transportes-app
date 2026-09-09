import { useMutation } from '@tanstack/react-query';
import { trackingService } from '@/services/tracking';

export function useTracking() {
  return useMutation({ mutationFn: (code: string) => trackingService.trackShipment(code) });
}
