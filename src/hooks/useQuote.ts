import { useMutation } from '@tanstack/react-query';
import { quoteService } from '@/services/quotes';

export function useQuote() {
  return useMutation({ mutationFn: quoteService.requestQuote });
}
