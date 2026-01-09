// @ts-ignore
import { entityType } from '../types.js';

export const entity = (handler: any) => ({
  type: entityType,
  handler,
});
