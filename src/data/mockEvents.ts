import { EventItem } from '../types';
import heroImg from '../assets/images/soho_hero_lounge_1785730692659.jpg';
import vipSecImg from '../assets/images/soho_vip_section_1785730703816.jpg';
import cocktailBarImg from '../assets/images/soho_cocktail_bar_1785730726576.jpg';

export const EVENTS: EventItem[] = [
  {
    id: 'evt-gold-rush',
    title: 'Gold Rush Fridays',
    dayOfWeek: 'Every Friday',
    time: '10:00 PM – 2:00 AM',
    headline: 'High-Energy Open Format & International Club Hits',
    djs: ['DJ Phantasy', 'Guest Headliners'],
    coverFee: '$20 General • Complimentary for VIP Cardholders',
    image: heroImg,
    description: 'Minneapolis’ premier weekend kickoff. Synchronized lighting arrays, confetti canons, and the city’s most energetic nightlife crowd.',
    tags: ['Hip-Hop', 'Open-Format', 'Bottle Parades']
  },
  {
    id: 'evt-obsidian',
    title: 'Obsidian Saturdays: Noir Society',
    dayOfWeek: 'Every Saturday',
    time: '10:00 PM – 2:00 AM',
    headline: 'Atmospheric Deep House & Elevated R&B',
    djs: ['Resident Maestro K-Vibe', 'Live Percussionists'],
    coverFee: '$25 General • Express Entry for VIP Members',
    image: vipSecImg,
    description: 'A theatrical nightlife immersion featuring live saxophone, laser choreography, and the Soho signature bottle presentation ceremony.',
    tags: ['Deep House', 'Afro-Beats', 'VIP Red Carpet']
  },
  {
    id: 'evt-industry-sunday',
    title: 'Industry Dynasty Sundays',
    dayOfWeek: 'Select Sundays',
    time: '9:00 PM – 2:00 AM',
    headline: 'Twin Cities Hospitality & Nightlife Elite Gathering',
    djs: ['Curated Guest Collectives'],
    coverFee: '$15 General • Half-Price Bottles for Industry Cards',
    image: cocktailBarImg,
    description: 'Dedicated to hospitality insiders, creators, and night owls. Intimate vibe, bespoke craft cocktails, and unreleased mixes.',
    tags: ['Industry Night', 'Craft Mixology', 'Exclusive Lounge']
  }
];
