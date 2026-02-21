import { createMemoryKeyService, createMemorySigner } from 'near-api-ts';

export const createMemoryService = ({
  keySources,
  // signer: { taskQueue },
}: any) => {
  return {
    serviceId: 'memory' as const,
    createService: async () => {
      const keyService = await createMemoryKeyService({ keySources });
      return { keyService };
    },
    // args should be general and one for all services;
    createSigner: async ({ signerAccountId, client, service }: any) =>
      await createMemorySigner({
        signerAccountId,
        client,
        keyService: service.keyService,
      }),
  };
};
// signerAccountId, signService
