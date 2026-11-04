import { TableSection } from '../types';

export const SECTIONS: TableSection[] = [
  // 3 Sections on the LEFT of the DJ Booth
  {
    id: 'the-vault',
    name: 'Amuse',
    tagline: 'Left Flank Sanctuary • Ultra-VIP Private Enclave',
    capacity: 6,
    minSpend: 2000,
    description: 'An impenetrable enclave of bespoke nightlife luxury positioned on the left flank of the central DJ booth. Features reinforced sound-dampened architecture, custom brass-and-gold accents, dedicated host, and private bottle presentation rituals.',
    features: ['Direct DJ Left Flank', 'Private Amuse Host & Security', 'Dedicated LED Bottle Presentation', 'Line Bypass & Private Check-In'],
    image: '', // Pictures removed as requested; gold Soho logo displayed instead
    isPopular: true,
    tableNumbers: ['A-101', 'A-102', 'A-103'],
    side: 'left',
    positionIndex: 1,
    zoneLabel: 'Stage Left (DJ Flank)'
  },
  {
    id: 'prive',
    name: 'Privé',
    tagline: 'Elevated Left Mezzanine • Intimate Designer Salon',
    capacity: 6,
    minSpend: 1500,
    description: 'Soho Lounge’s signature private salon positioned on the elevated left wing overlooking the dance floor and DJ stage. French-inspired minimalist black-and-gold aesthetic, custom smoked-glass banquettes, dedicated mixologist, and private bar access.',
    features: ['Panoramic Left Stage View', 'Dedicated Mixologist & Server', 'Curated Ice Bucket Setup', 'Express Door Line Bypass'],
    image: '',
    isPopular: false,
    tableNumbers: ['P-201', 'P-202', 'P-203'],
    side: 'left',
    positionIndex: 2,
    zoneLabel: 'Left Wing (Elevated Tier)'
  },
  {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Outer Left Wing • Plush Banquettes & Deep Bass Resonance',
    capacity: 6,
    minSpend: 1000,
    description: 'Sumptuous royal violet velvet seating flanking the left perimeter. Unrivaled sound immersion from the Void Acoustics acoustic array, ambient candle-glow cocktail tables, and rapid bottle service runners.',
    features: ['Acoustic Sub-Bass Immersion', 'Dedicated VIP Host', 'Sparkler Presentation Included', 'Expedited Drink Runners'],
    image: '',
    isPopular: false,
    tableNumbers: ['VL-301', 'VL-302', 'VL-303'],
    side: 'left',
    positionIndex: 3,
    zoneLabel: 'Left Wing (Outer Lounge)'
  },

  // 3 Sections on the RIGHT of the DJ Booth
  {
    id: 'the-suite',
    name: 'The Suite',
    tagline: 'Right Flank Master Tier • Elevated Penthouse Sightline',
    capacity: 6,
    minSpend: 2500,
    description: 'Our most expansive VIP enclave positioned immediately to the right flank of the DJ booth. Wrap-around leather sectional, brushed titanium finishes, private personal concierge, and panoramic views of the entire dance floor.',
    features: ['Direct DJ Right Flank', 'Dedicated Butler & Security Escort', 'Custom Video Wall Tribute', 'Complimentary Champagne Welcome'],
    image: '',
    isPopular: true,
    tableNumbers: ['S-101', 'S-102', 'S-103'],
    side: 'right',
    positionIndex: 1,
    zoneLabel: 'Stage Right (DJ Flank)'
  },
  {
    id: 'nicollet',
    name: 'Nicollet',
    tagline: 'Outer Right Window Overlook • Minneapolis Skyline Glow',
    capacity: 6,
    minSpend: 1200,
    description: 'Set along the illuminated 923 Nicollet Mall window wall on the right side of the venue. Sleek glass-and-marble fire tables, downtown Minneapolis skyline backdrop, and curated bottle presentations.',
    features: ['Nicollet Mall Street Views', 'Ambient Fire Tables', 'Craft Mixology Access', 'Dedicated Host'],
    image: '',
    isPopular: false,
    tableNumbers: ['N-201', 'N-202', 'N-203'],
    side: 'right',
    positionIndex: 2,
    zoneLabel: 'Right Wing (Skyline View)'
  },
  {
    id: 'the-house',
    name: 'The House',
    tagline: 'Right Wing Front-Row • Epicenter of High Energy',
    capacity: 6,
    minSpend: 1500,
    description: 'The epicenter of Soho Lounge’s nightlife energy on the right flank. Steps away from the DJ stage and main dance canopy, engineered for celebratory groups, high-energy bottle parades, and sparkler shows.',
    features: ['Front-Row Dance Platform', 'Sparkler & Confetti Presentation', 'Dedicated VIP Host', 'Express Bottle Parade'],
    image: '',
    isPopular: false,
    tableNumbers: ['H-301', 'H-302', 'H-303'],
    side: 'right',
    positionIndex: 3,
    zoneLabel: 'Right Wing (Party Epicenter)'
  }
];
