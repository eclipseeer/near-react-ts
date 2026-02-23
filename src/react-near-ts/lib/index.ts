import { createMainnetClient as natCreateMainnetClient, createTestnetClient as natCreateTestnetClient } from '../near-ts/packages/near-api-ts/browser';

export const createTestnetClient = () => natCreateTestnetClient;
export const createMainnetClient = () => natCreateMainnetClient;
