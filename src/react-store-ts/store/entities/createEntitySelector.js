import { entityType } from '../types.js';

export const createEntitySelector = (entities) => (selector) => {
  if (typeof selector !== 'function') {
    throw new Error(`Selector: '${selector}' must be a function`);
  }

  const entity = selector(entities);
  if (entity?.type !== entityType) throw new Error('Invalid selector');

  return [entity.get(), entity.set, entity.get];
};
