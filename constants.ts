import { Project } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Aurum Sky Residences',
    location: 'Worli, South Mumbai',
    startingPrice: '₹ 4.5 Cr',
    image: 'https://picsum.photos/id/122/800/600',
    description: 'Experience the pinnacle of luxury living with sea-facing decks, concierge services, and world-class amenities in the heart of the financial district.',
    amenities: ['Infinity Pool', 'Sky Lounge', 'Private Gym', 'Concierge', 'Valet Parking'],
    configurations: [
      { type: '3 BHK', size: '1800 Sq. Ft.', price: '₹ 4.5 Cr' },
      { type: '4 BHK', size: '2500 Sq. Ft.', price: '₹ 6.8 Cr' },
      { type: 'Penthouse', size: '4500 Sq. Ft.', price: '₹ 12.5 Cr' },
    ],
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Greenwood Estate',
    location: 'Whitefield, Bangalore',
    startingPrice: '₹ 1.2 Cr',
    image: 'https://picsum.photos/id/78/800/600',
    description: 'A serene sanctuary amidst the bustle of the IT hub. 80% open spaces, lush greenery, and sustainable living designed for the modern family.',
    amenities: ['Clubhouse', 'Tennis Court', 'Jogging Track', 'Kids Play Area', 'Amphitheater'],
    configurations: [
      { type: '2 BHK', size: '1100 Sq. Ft.', price: '₹ 1.2 Cr' },
      { type: '3 BHK', size: '1550 Sq. Ft.', price: '₹ 1.8 Cr' },
    ],
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'The Cobalt Tower',
    location: 'Gachibowli, Hyderabad',
    startingPrice: '₹ 95 L',
    image: 'https://picsum.photos/id/188/800/600',
    description: 'Modern high-rise living with smart-home automation and direct connectivity to the financial district.',
    amenities: ['Co-working Space', 'Rooftop Garden', 'Smart Security', 'Indoor Games'],
    configurations: [
      { type: '2 BHK', size: '1250 Sq. Ft.', price: '₹ 95 L' },
      { type: '3 BHK', size: '1600 Sq. Ft.', price: '₹ 1.4 Cr' },
    ],
    isFeatured: false,
  },
];

export const BUDGET_RANGES = [
  '₹ 50L - ₹ 80L',
  '₹ 80L - ₹ 1.5 Cr',
  '₹ 1.5 Cr - ₹ 3 Cr',
  '₹ 3 Cr+',
];

export const CONFIG_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Villa/Plot'];
