import type { NearWalletBase } from '@hot-labs/near-connect';
import { nearToken, transfer } from 'near-api-ts';

/*
export interface TransferAction {
  type: "Transfer";
  params: { deposit: string };
}
 */

const toHotAction = (action: any) => {
  if (action.actionType === 'Transfer')
    return {
      type: 'Transfer',
      params: { deposit: nearToken(action.amount).yoctoNear.toString() },
    };
};

const toHotActions = (intent: any) => {
  if (intent.action) return [toHotAction(intent.action)];

  if (intent.actions)
    return intent.actions.map((action: any) => toHotAction(action));

  return [];
};

export const createSafeExecuteTransaction =
  (wallet: NearWalletBase) =>
  async ({ intent }: any) => {
    console.log('createSafeExecuteTransaction', intent);
    try {
      const tx = await wallet.signAndSendTransaction({
        actions: toHotActions(intent),
        receiverId: intent.receiverAccountId,
      });
      return { value: { rawRpcResult: tx }, ok: true };
    } catch (e) {
      return { error: e, ok: false };
    }
  };
