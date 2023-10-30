import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp/presets/all';

/**
 * Setup BPA Services
 * @param context WebPartContext
 */
export const setup = (context: WebPartContext): void => {
  sp.setup({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed here
    spfxContext: context as any
  });
};
