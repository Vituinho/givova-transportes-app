import NetInfo from '@react-native-community/netinfo';
import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(public readonly userMessage: string, public readonly status?: number) {
    super(userMessage);
    this.name = 'ApiError';
  }
}

export class IntegrationUnavailableError extends ApiError {
  constructor(feature: string) {
    super(`${feature} online em integração.`);
    this.name = 'IntegrationUnavailableError';
  }
}

type RequestOptions = RequestInit & { timeoutMs?: number };

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!env.apiUrl) throw new IntegrationUnavailableError('Serviço');

  const network = await NetInfo.fetch();
  if (network.isConnected === false) {
    throw new ApiError('Você está sem conexão. Verifique sua internet e tente novamente.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 12000);

  try {
    const response = await fetch(`${env.apiUrl}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...options.headers },
    });

    if (!response.ok) {
      if (response.status === 404) throw new ApiError('Nenhuma informação foi encontrada.', 404);
      throw new ApiError('Não foi possível conectar à Givova neste momento. Tente novamente.', response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('A solicitação demorou mais que o esperado. Tente novamente.');
    }
    throw new ApiError('Não foi possível conectar à Givova neste momento. Tente novamente.');
  } finally {
    clearTimeout(timeout);
  }
}

export function getUserMessage(error: unknown) {
  return error instanceof ApiError ? error.userMessage : 'Ocorreu um problema inesperado. Tente novamente.';
}
