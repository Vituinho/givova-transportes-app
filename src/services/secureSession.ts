import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'givova.accessToken';

export const secureSession = {
  getAccessToken: () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token),
  clearAccessToken: () => SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
};
