import { createMemoryKeyService, createMemorySigner } from '../near-ts/packages/near-api-ts/browser';

export const createMemoryService = ({
  keySources,
  // signer: { taskQueue },
}: any) => {
  return {
    serviceId: 'memory' as const,
    createService: () => {
      const keyService = createMemoryKeyService({ keySources });
      return { keyService };
    },
    // args should be general and one for all services;
    createSigner: ({ signerAccountId, client, service }: any) =>
      createMemorySigner({
        signerAccountId,
        client,
        keyService: service.keyService,
      }),
  };
};
// signerAccountId, signService
