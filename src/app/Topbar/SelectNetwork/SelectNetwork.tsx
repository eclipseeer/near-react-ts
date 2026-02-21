import { useSelectedNetwork } from '../../../lib/hooks/useSelectedNetwork.ts';
import { Select } from '@mantine/core';

export const SelectNetwork = () => {
  const { selectedNetworkId, networkIds, selectNetwork } = useSelectedNetwork();

  return (
    <Select
      w={150}
      value={selectedNetworkId}
      onChange={(value) => selectNetwork({ networkId: value })}
      data={networkIds}
      checkIconPosition="right"
    />
  );
};
