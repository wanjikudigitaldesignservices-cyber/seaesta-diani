import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Users,
  Star,
  Wifi,
  Wind,
  Tv,
  CookingPot,
  ShieldCheck,
  Car,
  Waves,
  Eye,
  TreePalm,
  Dumbbell,
  ChevronLeft,
} from 'lucide-react';
import { fetchUnitBySlug, fetchAvailability } from '@/lib/api';
import type { Unit, AvailabilityBlock } from '@/lib/types';
import { TideCalendar } from '@/components/booking/TideCalendar';
import { BookingDrawer } from '@/components/booking/BookingDrawer';

const AMENITY_ICONS: Record<string, React.ElementType> = {
  WiFi: Wifi,
  'Air Conditioning': Wind,
  'Smart TV': Tv,
  Kitchenette: CookingPot,
  'Full Kitchen': CookingPot,
  Security: ShieldCheck,
  Parking: Car,
  'Pool View': Waves,
  'Ocean View': Eye,
  'Ocean Glimpse': Eye,
  'City View': Eye,
  'Skyline View': Eye,
  'Garden View': TreePalm,
  Garden: TreePalm,
  'Beach Access': Waves,
  'Plunge Pool': Waves,
  'Rooftop Access': Eye,
  Courtyard: TreePalm,
  Balcony: Eye,
  'Gym Access': Dumbbell,
  Workspace: Tv,
  'Hot Water': Waves,
};

export function UnitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchUnitBySlug(slug).then((u) => {
      setUnit(u);
      if (u) {
        fetchAvailability(u.id).then((b) => {
          setBlocks(b);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [slug]);

  const handleSelectRange = useCallback(
    (ci: Date, co: Date | null) => {
      setCheckIn(ci);
      setCheckOut(co);
    },
    []
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-coral-sand pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-seafoam border-t-transparent" />
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-coral-sand pt-24">
        <h1 className="mb-4 font-display text-3xl font-bold text-reef-deep">
          Unit Not Found
        </h1>
        <Link
          to="/locations"
          className="text-baobab-coral underline hover:text-baobab-coral/80"
        >
          Browse all units
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coral-sand pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Breadcrumb */}
        <Link
          to="/locations"
          className="mb-6 inline-flex items-center gap-1 text-sm text-reef-deep/50 no-underline hover:text-reef-deep"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all studios
        </Link>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left column — details */}
          <div className="lg:col-span-3">
            {/* Gallery */}
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-seafoam/30 to-reef-deep/60 sm:col-span-2">
                <img
                  src={unit.photos?.[0] || '/images/hero_bg.png'}
                  alt={unit.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero_bg.png';
                  }}
                />
              </div>
              {unit.photos.slice(1, 3).map((photo, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-reef-deep/40 to-seafoam/30"
                >
                  <img
                    src={photo}
                    alt={`${unit.name} view ${i + 2}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_bg.png';
                    }}
                  />
                </div>
              ))}
              {unit.photos.length < 2 && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-reef-deep/40 to-seafoam/30">
                   <img
                    src="/images/hero_bg.png"
                    alt={`${unit.name} view 2`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              {unit.photos.length < 3 && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-reef-deep/40 to-seafoam/30">
                   <img
                    src="/images/hero_bg.png"
                    alt={`${unit.name} view 3`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
            </div>

            {/* Unit info */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <h1 className="font-display text-3xl font-bold text-reef-deep md:text-4xl">
                {unit.name}
              </h1>
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-sm">
                <Star className="h-4 w-4 fill-baobab-coral text-baobab-coral" />
                <span className="text-sm font-semibold text-reef-deep">
                  4.9
                </span>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4 text-sm text-reef-deep/60">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-seafoam" />
                {unit.location?.name}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4 text-seafoam" />
                Up to {unit.capacity} guests
              </span>
            </div>

            <p className="mb-8 text-base leading-relaxed text-reef-deep/70">
              {unit.description}
            </p>

            {/* Amenities */}
            <h2 className="mb-4 font-display text-xl font-bold text-reef-deep">
              Amenities
            </h2>
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {unit.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] || Star;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 rounded-xl bg-white p-3 shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-seafoam" />
                    <span className="text-sm font-medium text-reef-deep">
                      {amenity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — calendar + booking */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              {/* Price */}
              <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-reef-deep">
                    KES {unit.price_per_night.toLocaleString()}
                  </span>
                  <span className="text-sm text-reef-deep/50">/ night</span>
                </div>
              </div>

              {/* Tide Calendar */}
              <TideCalendar
                blocks={blocks}
                selectedCheckIn={checkIn}
                selectedCheckOut={checkOut}
                onSelectRange={handleSelectRange}
              />

              {/* Book button */}
              <button
                type="button"
                disabled={!checkIn || !checkOut}
                onClick={() => setDrawerOpen(true)}
                className="mt-6 w-full rounded-xl bg-baobab-coral py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-baobab-coral/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkIn && checkOut
                  ? 'Book This Unit'
                  : 'Select dates to book'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking drawer */}
      <BookingDrawer
        unit={unit}
        checkIn={checkIn}
        checkOut={checkOut}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={() => {
          // Re-fetch blocks to show new mock booking
          fetchAvailability(unit.id).then(setBlocks);
          // Optional: clear selection
          setCheckIn(null);
          setCheckOut(null);
        }}
      />
    </div>
  );
}
