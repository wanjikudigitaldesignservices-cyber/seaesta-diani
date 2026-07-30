// ============================================================
// Mock data — seed for demo mode (no Supabase connected)
// ============================================================
import type { Location, Unit, AvailabilityBlock } from './types';

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 'loc-1',
    name: 'Diani Beach',
    slug: 'diani-beach',
    description:
      'Steps from the white sand of Diani Beach, with ocean breezes and swaying palms. The heart of Kenya\'s south coast.',
    address: 'Diani Beach Road, Kwale County',
    image_url: '/images/diani-beach.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'loc-2',
    name: 'Ukunda Town',
    slug: 'ukunda-town',
    description:
      'A short tuk-tuk ride from the beach, with local markets, restaurants, and easy access to Ukunda Airport.',
    address: 'Ukunda, Kwale County',
    image_url: '/images/ukunda-town.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'loc-3',
    name: 'Galu Beach',
    slug: 'galu-beach',
    description:
      'Quieter stretch of coastline south of Diani, known for kite surfing and spectacular sunsets.',
    address: 'Galu Beach, Kwale County',
    image_url: '/images/galu-beach.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'loc-4',
    name: 'Nairobi',
    slug: 'nairobi',
    description:
      'City studio for guests transiting through Nairobi — close to Jomo Kenyatta Airport and the Nairobi National Park.',
    address: 'Kilimani, Nairobi',
    image_url: '/images/nairobi.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

export const MOCK_UNITS: Unit[] = [
  {
    id: 'unit-1',
    location_id: 'loc-1',
    name: 'Studio Reef',
    slug: 'studio-reef',
    description:
      'Pool-view studio with king bed, full kitchenette, and a private balcony overlooking the garden pool. Wake up to birdsong and the scent of frangipani.',
    capacity: 2,
    price_per_night: 8500,
    amenities: ['Pool View', 'Kitchenette', 'Balcony', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security'],
    photos: ['/images/units/room1.jpg', '/images/diani-beach.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-reef',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-2',
    location_id: 'loc-1',
    name: 'Studio Coral',
    slug: 'studio-coral',
    description:
      'Ground-floor studio with garden access, perfect for couples seeking a quiet retreat steps from the pool.',
    capacity: 2,
    price_per_night: 7500,
    amenities: ['Garden View', 'Kitchenette', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security'],
    photos: ['/images/units/room1.jpg', '/images/diani-beach.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-coral',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-3',
    location_id: 'loc-1',
    name: 'Studio Tide',
    slug: 'studio-tide',
    description:
      'Top-floor studio with ocean glimpses from the rooftop terrace. The best sunset spot in the building.',
    capacity: 3,
    price_per_night: 9500,
    amenities: ['Ocean Glimpse', 'Rooftop Access', 'Kitchenette', 'Balcony', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security'],
    photos: ['/images/units/room1.jpg', '/images/diani-beach.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-tide',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-4',
    location_id: 'loc-2',
    name: 'Studio Baobab',
    slug: 'studio-baobab',
    description:
      'Spacious studio near Ukunda town centre, ideal for longer stays with a fully equipped kitchen and workspace.',
    capacity: 2,
    price_per_night: 5500,
    amenities: ['Full Kitchen', 'Workspace', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security', 'Parking'],
    photos: ['/images/units/room3.jpg', '/images/ukunda-town.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-baobab',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-5',
    location_id: 'loc-2',
    name: 'Studio Palm',
    slug: 'studio-palm',
    description:
      'Cosy studio with a shaded courtyard, walking distance to local markets and matatu stops.',
    capacity: 2,
    price_per_night: 5000,
    amenities: ['Courtyard', 'Kitchenette', 'WiFi', 'Air Conditioning', 'Hot Water', 'Security'],
    photos: ['/images/units/room3.jpg', '/images/ukunda-town.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-palm',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-6',
    location_id: 'loc-3',
    name: 'Studio Horizon',
    slug: 'studio-horizon',
    description:
      'Beachfront studio at Galu with unobstructed Indian Ocean views and direct beach access.',
    capacity: 4,
    price_per_night: 12000,
    amenities: ['Ocean View', 'Beach Access', 'Kitchenette', 'Balcony', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security'],
    photos: ['/images/units/room2.jpg', '/images/galu-beach.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-horizon',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-7',
    location_id: 'loc-3',
    name: 'Studio Wave',
    slug: 'studio-wave',
    description:
      'Garden-level studio tucked behind the dunes, with a private plunge pool shared between two units.',
    capacity: 2,
    price_per_night: 10000,
    amenities: ['Plunge Pool', 'Garden', 'Kitchenette', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security'],
    photos: ['/images/units/room2.jpg', '/images/galu-beach.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-wave',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-8',
    location_id: 'loc-4',
    name: 'Studio City',
    slug: 'studio-city',
    description:
      'Modern city studio in Kilimani with rooftop views, 25 minutes from JKIA. Perfect for a Nairobi stopover.',
    capacity: 2,
    price_per_night: 6000,
    amenities: ['City View', 'Kitchenette', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security', 'Parking', 'Gym Access'],
    photos: ['/images/units/room4.jpg', '/images/nairobi.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-city',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'unit-9',
    location_id: 'loc-4',
    name: 'Studio Skyline',
    slug: 'studio-skyline',
    description:
      'Top-floor Nairobi studio with floor-to-ceiling windows and skyline views. Business-ready workspace included.',
    capacity: 2,
    price_per_night: 7000,
    amenities: ['Skyline View', 'Workspace', 'Full Kitchen', 'WiFi', 'Air Conditioning', 'Hot Water', 'Smart TV', 'Security', 'Parking', 'Gym Access'],
    photos: ['/images/units/room4.jpg', '/images/nairobi.jpg'],
    airbnb_ical_url: null,
    ical_export_token: 'tok-skyline',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Generate some mock availability blocks for demo
const today = new Date();
function dateStr(d: Date): string {
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split('T')[0];
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export const MOCK_AVAILABILITY_BLOCKS: AvailabilityBlock[] = [
  {
    id: 'blk-1',
    unit_id: 'unit-1',
    start_date: dateStr(addDays(today, 2)),
    end_date: dateStr(addDays(today, 5)),
    source: 'airbnb',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'blk-2',
    unit_id: 'unit-1',
    start_date: dateStr(addDays(today, 10)),
    end_date: dateStr(addDays(today, 14)),
    source: 'direct',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'blk-3',
    unit_id: 'unit-2',
    start_date: dateStr(addDays(today, 1)),
    end_date: dateStr(addDays(today, 3)),
    source: 'manual',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'blk-4',
    unit_id: 'unit-3',
    start_date: dateStr(addDays(today, 5)),
    end_date: dateStr(addDays(today, 9)),
    source: 'airbnb',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'blk-5',
    unit_id: 'unit-6',
    start_date: dateStr(addDays(today, 3)),
    end_date: dateStr(addDays(today, 7)),
    source: 'direct',
    created_at: '2024-01-01T00:00:00Z',
  },
];
