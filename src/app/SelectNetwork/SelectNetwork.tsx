import { useSelectedNetwork } from '../../lib/useSelectedNetwork.ts';

export const SelectNetwork = () => {
  const { data, ok } = useSelectedNetwork();
  if (!ok) return null;
  const { selectedNetworkId, networkIds, selectNetwork } = data;

  return (
    <div>
      <select
        value={selectedNetworkId}
        onChange={(e) => selectNetwork(e.target.value)}
      >
        {networkIds.map((networkId: any) => (
          <option key={networkId} value={networkId}>
            {networkId}
          </option>
        ))}
      </select>
    </div>
  );
};
