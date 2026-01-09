import {
  createMainnetClient as natCreateMainnetClient,
  createTestnetClient as natCreateTestnetClient,
} from 'near-api-ts';

// TODO do we really need to keep natCreateTestnetClient as async fn?
export const createTestnetClient = () => async () =>
  await natCreateTestnetClient();

export const createMainnetClient = () => async () =>
  await natCreateMainnetClient();
