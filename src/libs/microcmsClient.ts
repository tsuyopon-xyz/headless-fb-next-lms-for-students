import { createClient as createMicroCMSClient } from 'microcms-js-sdk';

export const createClient = (serviceDomain: string, apiKey: string) => {
  if (!serviceDomain || !apiKey) {
    throw new Error(
      'Need `serviceDomain` and `key` in the environment variables.'
    );
  }

  return createMicroCMSClient({
    serviceDomain,
    apiKey,
  });
};
