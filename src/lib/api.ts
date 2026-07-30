// ============================================================
// API layer — uses mock data in demo, Supabase when configured
// ============================================================
import type { Location, Unit, AvailabilityBlock } from './types';
import { isSupabaseConfigured, supabase } from './supabase';
import {
  MOCK_LOCATIONS,
  MOCK_UNITS,
  MOCK_AVAILABILITY_BLOCKS,
} from './mock-data';

// ---- Locations ----

export async function fetchLocations(): Promise<Location[]> {
  if (!isSupabaseConfigured()) return MOCK_LOCATIONS;
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');
  if (error) throw error;
  return data as Location[];
}

export async function fetchLocationBySlug(
  slug: string
): Promise<Location | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_LOCATIONS.find((l) => l.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as Location;
}

// ---- Units ----

export async function fetchUnits(locationId?: string): Promise<Unit[]> {
  if (!isSupabaseConfigured()) {
    let units = MOCK_UNITS;
    if (locationId) {
      units = units.filter((u) => u.location_id === locationId);
    }
    return units.map((u) => ({
      ...u,
      location: MOCK_LOCATIONS.find((l) => l.id === u.location_id),
    }));
  }
  let query = supabase.from('units').select('*, location:locations(*)');
  if (locationId) {
    query = query.eq('location_id', locationId);
  }
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data as Unit[];
}

export async function fetchUnitBySlug(slug: string): Promise<Unit | null> {
  if (!isSupabaseConfigured()) {
    const unit = MOCK_UNITS.find((u) => u.slug === slug);
    if (!unit) return null;
    return {
      ...unit,
      location: MOCK_LOCATIONS.find((l) => l.id === unit.location_id),
    };
  }
  const { data, error } = await supabase
    .from('units')
    .select('*, location:locations(*)')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as Unit;
}

// ---- Availability ----

export async function fetchAvailability(
  unitId: string
): Promise<AvailabilityBlock[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_AVAILABILITY_BLOCKS.filter((b) => b.unit_id === unitId);
  }
  const { data, error } = await supabase
    .from('availability_blocks')
    .select('id, unit_id, start_date, end_date, source, created_at')
    .eq('unit_id', unitId)
    .gte('end_date', new Date().toISOString().split('T')[0]);
  if (error) throw error;
  return data as AvailabilityBlock[];
}

export function isDateBlocked(
  date: Date,
  blocks: AvailabilityBlock[]
): AvailabilityBlock | undefined {
  const ds = date.toISOString().split('T')[0];
  return blocks.find((b) => ds >= b.start_date && ds <= b.end_date);
}

export function isRangeAvailable(
  checkIn: Date,
  checkOut: Date,
  blocks: AvailabilityBlock[]
): boolean {
  const current = new Date(checkIn);
  while (current < checkOut) {
    if (isDateBlocked(current, blocks)) return false;
    current.setDate(current.getDate() + 1);
  }
  return true;
}

// ---- Bookings (will call Edge Functions in production) ----

export async function createBooking(data: {
  unit_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  special_requests?: string;
  check_in: string;
  check_out: string;
  dpa_consent: boolean;
}) {
  if (!isSupabaseConfigured()) {
    // Demo mode — simulate success
    return {
      success: true,
      booking_id: 'demo-booking-' + Date.now(),
      message: 'Demo booking created (no payment processed)',
    };
  }
  const { data: result, error } = await supabase.functions.invoke(
    'create-booking',
    { body: data }
  );
  if (error) throw error;
  return result;
}

// ---- Contact ----

export async function submitInquiry(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!isSupabaseConfigured()) {
    return { success: true, message: 'Demo inquiry submitted' };
  }
  const { error } = await supabase.from('inquiries').insert([data]);
  if (error) throw error;
  return { success: true };
}
