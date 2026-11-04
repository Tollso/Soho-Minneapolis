import { BottleItem } from '../types';

// Official Soho Lounge Bottle Service Spirits & Mixers Menu (IMG_1563)
export const BOTTLE_SERVICE_SPIRITS: BottleItem[] = [
  // --- VODKA ---
  {
    id: 'titos-vodka',
    name: "Tito's",
    category: 'Vodka',
    volume: '750ml',
    price: 0,
    description: 'Handcrafted in copper pot stills. Exceptionally clean, gluten-free, and smooth.',
    includesSparklers: false
  },
  {
    id: 'belvedere-vodka',
    name: 'Belvedere',
    category: 'Vodka',
    volume: '750ml',
    price: 0,
    description: 'Luxury Polish rye vodka crafted with zero additives. Velvety, rich, and pristine.',
    includesSparklers: true
  },
  {
    id: 'grey-goose-vodka',
    name: 'Grey Goose',
    category: 'Vodka',
    volume: '750ml',
    price: 0,
    description: 'Distilled in Picardy from French winter wheat with Gensac spring water. World-class elegance.',
    includesSparklers: true
  },

  // --- GIN ---
  {
    id: 'gray-whale-gin',
    name: 'Gray Whale',
    category: 'Gin',
    volume: '750ml',
    price: 0,
    description: 'Distilled with seven sustainably harvested California coastal botanicals including sea kelp.',
    includesSparklers: false
  },
  {
    id: 'tanqueray-gin',
    name: 'Tanqueray',
    category: 'Gin',
    volume: '750ml',
    price: 0,
    description: 'Timeless London Dry gin celebrated for balanced juniper, angelica, and coriander notes.',
    includesSparklers: false
  },
  {
    id: 'bombay-sapphire-gin',
    name: 'Bombay Sapphire',
    category: 'Gin',
    volume: '750ml',
    price: 0,
    description: 'Vapor-infused with ten hand-selected exotic botanicals for an aromatic, bright profile.',
    includesSparklers: false
  },

  // --- RUM ---
  {
    id: 'captain-morgan-rum',
    name: 'Captain Morgan',
    category: 'Rum',
    volume: '750ml',
    price: 0,
    description: 'Classic spiced Caribbean rum blended with secret spices and aged in charred oak barrels.',
    includesSparklers: false
  },
  {
    id: 'rumhaven-rum',
    name: 'RumHaven',
    category: 'Rum',
    volume: '750ml',
    price: 0,
    description: 'Premium Caribbean rum made with real coconut water and pure cane sugar for natural refreshment.',
    includesSparklers: false
  },
  {
    id: 'planteray-3-star-rum',
    name: 'Planteray 3 Star',
    category: 'Rum',
    volume: '750ml',
    price: 0,
    description: 'Artisanal white rum blending the heritage spirits of Barbados, Jamaica, and Trinidad.',
    includesSparklers: false
  },

  // --- TEQUILA ---
  {
    id: 'don-julio-blanco',
    name: 'Don Julio Blanco',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Crisp, citrusy silver tequila distilled from 100% blue Weber agave in the Jalisco highlands.',
    includesSparklers: false
  },
  {
    id: 'don-julio-reposado',
    name: 'Don Julio Reposado',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Aged 8 months in American white oak barrels. Rich hints of dark chocolate, vanilla, and cinnamon.',
    includesSparklers: true
  },
  {
    id: 'casamigos-blanco',
    name: 'Casamigos Blanco',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Ultra-smooth small batch blanco with notes of citrus, sweet agave, and pure vanilla.',
    includesSparklers: false
  },
  {
    id: 'casamigos-reposado',
    name: 'Casamigos Reposado',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Aged 7 months in premium oak casks. Silky golden finish with caramel and cocoa undertones.',
    includesSparklers: true
  },
  {
    id: 'komos-rosa-reposado',
    name: 'Komos Rosa Reposado',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Ultra-luxury reposado rested in French oak red wine barrels for an exquisite natural rosé hue.',
    includesSparklers: true
  },
  {
    id: 'clase-azul-reposado',
    name: 'Clase Azul Reposado',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Iconic sculpted ceramic decanter. Unrivaled smoothness with hazelnut, vanilla, and cooked agave.',
    includesSparklers: true
  },
  {
    id: 'don-julio-1942',
    name: 'Don Julio 1942',
    category: 'Tequila',
    volume: '750ml',
    price: 0,
    description: 'Celebrated añejo aged for at least 2.5 years in American white oak. The premier VIP nightlife choice.',
    includesSparklers: true
  },

  // --- WHISKEY ---
  {
    id: '2xo-french-oak-bourbon',
    name: '2XO French Oak Bourbon',
    category: 'Whiskey',
    volume: '750ml',
    price: 0,
    description: 'Double-barreled in charred French oak casks. Rich layers of caramel, baking spice, and dark fruit.',
    includesSparklers: true
  },
  {
    id: 'bulleit-bourbon-rye',
    name: 'Bulleit Bourbon or Rye',
    category: 'Whiskey',
    volume: '750ml',
    price: 0,
    description: 'High-rye mash bill offering bold, spicy character with clean, lingering oak notes.',
    includesSparklers: false
  },
  {
    id: 'woodford-reserve',
    name: 'Woodford Reserve',
    category: 'Whiskey',
    volume: '750ml',
    price: 0,
    description: 'Master distiller pot-still Kentucky bourbon with over 200 detectable flavor notes.',
    includesSparklers: true
  },
  {
    id: 'johnnie-walker-black',
    name: 'Johnnie Walker Black',
    category: 'Whiskey',
    volume: '750ml',
    price: 0,
    description: 'Iconic 12-year blended Scotch whisky crafted from the four corners of Scotland.',
    includesSparklers: false
  },

  // --- REFRESHMENTS & MIXERS ---
  {
    id: 'red-bull-service',
    name: 'Red Bull (Can or Bucket of 10)',
    category: 'Buckets & Mixers',
    volume: 'Single or Bucket of 10',
    price: 0,
    description: 'Original, Sugarfree, or Tropical Red Bull energy mixers to power your evening.',
    includesSparklers: false
  },
  {
    id: 'fiji-water-service',
    name: 'Fiji Water 500ML (Single or Bucket of 10)',
    category: 'Buckets & Mixers',
    volume: 'Single or Bucket of 10',
    price: 0,
    description: 'Natural artesian water from the islands of Viti Levu, Fiji. Pristine hydration.',
    includesSparklers: false
  },
  {
    id: 'high-noon-bucket',
    name: 'High Noon (Bucket of 5)',
    category: 'Buckets & Mixers',
    volume: 'Bucket of 5',
    price: 0,
    description: 'Crafted with real vodka, real fruit juice, and sparkling water. Assorted flavors.',
    includesSparklers: false
  }
];
