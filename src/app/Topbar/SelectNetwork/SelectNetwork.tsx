import { useSelectedNetwork } from '../../../lib/useSelectedNetwork.ts';
import { Select } from '@mantine/core';

export const SelectNetwork = () => {
  const { selectedNetworkId, networkIds, selectNetwork, ok } =
    useSelectedNetwork();

  if (!ok) return null;

  return (
    <Select
      w={150}
      value={selectedNetworkId}
      onChange={selectNetwork}
      data={networkIds}
      checkIconPosition="right"
    />
  );
};
