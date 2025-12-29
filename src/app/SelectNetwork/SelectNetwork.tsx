import { useSelectedNetwork } from '../../lib/useSelectedNetwork.ts';

export const SelectNetwork = () => {
  const { selectedNetworkId, networkIds, selectNetwork, ok } =
    useSelectedNetwork();

  if (!ok) return null;

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
