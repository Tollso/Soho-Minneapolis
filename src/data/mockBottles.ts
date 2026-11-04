import { BottleItem } from '../types';
import { BOTTLE_SERVICE_SPIRITS } from './mockSpiritsBottles';
import { CHAMPAGNE_WINE_MENU } from './mockWineChampagne';

// Unified Soho Lounge Official Bottle Menu (Spirits, Wine, Champagne, Buckets)
export const BOTTLE_MENU: BottleItem[] = [
  ...BOTTLE_SERVICE_SPIRITS,
  ...CHAMPAGNE_WINE_MENU
];

export { BOTTLE_SERVICE_SPIRITS } from './mockSpiritsBottles';
export { CHAMPAGNE_WINE_MENU } from './mockWineChampagne';
