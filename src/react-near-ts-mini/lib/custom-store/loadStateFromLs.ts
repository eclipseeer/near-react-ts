export const loadStateFromLs = (appName: string, networkId: string) => {
  const lsStateKey = `${appName}:${networkId}`;

  const defaultState = {
    version: 1,
    connectedAccountId: null,
  };

  // 1. Try to load state from local storage
  const lsValue = localStorage.getItem(lsStateKey);

  // 2. If no state is found in local storage, initialize with default values
  if (!lsValue) {
    localStorage.setItem(lsStateKey, JSON.stringify(defaultState));
    return defaultState;
  }

  // 3. If we have a state in local storage, try to parse it
  try {
    const lsState = JSON.parse(lsValue);
    return lsState;
  } catch (e) {
    localStorage.setItem(lsStateKey, JSON.stringify(defaultState));
    return defaultState;
  }
};
