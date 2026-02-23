export const setStateToLs = (
  state: any,
  appName: string,
  networkId: string,
) => {
  const lsStateKey = `${appName}:${networkId}`;
  localStorage.setItem(lsStateKey, JSON.stringify(state));
};
