// ============================================================
// Seaesta Studios Diani — Core Types
// ============================================================

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  location_id: string;
  name: string;
  slug: string;
  description: string;
  capacity: number;
  price_per_night: number;
  amenities: string[];
  photos: string[];
  airbnb_ical_url: string | null;
  ical_export_token: string;
  created_at: string;
  updated_at: string;
  // Joined
  location?: Location;
}

export type BlockSource = 'airbnb' | 'direct' | 'manual';

export interface AvailabilityBlock {
  id: string;
  unit_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  source: BlockSource;
  external_uid?: string;
  booking_id?: string;
  created_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  unit_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  check_in: string;
  check_out: string;
  total_price: number;
  special_requests: string | null;
  status: BookingStatus;
  dpa_consent: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  unit?: Unit;
  payments?: Payment[];
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: string;
  booking_id: string;
  intasend_txn_ref: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  raw_webhook: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// ============================================================
// Form/Request types
// ============================================================

export interface BookingFormData {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  special_requests?: string;
  check_in: string;
  check_out: string;
  unit_id: string;
  dpa_consent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
