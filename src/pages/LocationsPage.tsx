import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { fetchLocations, fetchUnits } from '@/lib/api';
import type { Location, Unit } from '@/lib/types';
import { cn } from '@/lib/utils';

export function LocationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeLocation = searchParams.get('location') || 'all';
  const [locations, setLocations] = useState<Location[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLocations(), fetchUnits()]).then(([locs, us]) => {
      setLocations(locs);
      setUnits(us);
      setLoading(false);
    });
  }, []);

  const filteredUnits =
    activeLocation === 'all'
      ? units
      : units.filter(
          (u) =>
            u.location?.slug === activeLocation ||
            u.location_id ===
              locations.find((l) => l.slug === activeLocation)?.id
        );

  return (
    <div className="min-h-screen bg-coral-sand pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-display text-4xl font-bold text-reef-deep md:text-5xl">
            Our Studios
          </h1>
          <p className="mx-auto max-w-2xl text-reef-deep/60">
            Browse all 9 studios across 4 locations. Each one comes with a
            kitchenette, WiFi, and everything you need for a comfortable coastal
            stay.
          </p>
        </div>

        {/* Location filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all',
              activeLocation === 'all'
                ? 'bg-reef-deep text-white shadow-lg'
                : 'bg-white text-reef-deep hover:bg-reef-deep/10'
            )}
          >
            All Locations
          </button>
          {locations.map((loc) => (
            <button
              key={loc.slug}
              type="button"
              onClick={() => setSearchParams({ location: loc.slug })}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all',
                activeLocation === loc.slug
                  ? 'bg-reef-deep text-white shadow-lg'
                  : 'bg-white text-reef-deep hover:bg-reef-deep/10'
              )}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Units grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-seafoam border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUnits.map((unit) => (
              <Link
                key={unit.id}
                to={`/unit/${unit.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md no-underline transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-seafoam/30 to-reef-deep/60">
                  <img
                    src={unit.photos?.[0] || '/images/hero_bg.png'}
                    alt={unit.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_bg.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-reef-deep/50 to-transparent" />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-reef-deep shadow-md backdrop-blur-sm">
                    KES {unit.price_per_night.toLocaleString()}/night
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="mb-1 font-display text-lg font-bold text-reef-deep">
                    {unit.name}
                  </h3>
                  <div className="mb-3 flex items-center gap-3 text-xs text-reef-deep/50">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {unit.location?.name ?? 'Location'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Up to {unit.capacity} guests
                    </span>
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-reef-deep/60">
                    {unit.description}
                  </p>

                  {/* Amenities preview */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {unit.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-seafoam/10 px-2.5 py-0.5 text-[11px] font-medium text-seafoam"
                      >
                        {a}
                      </span>
                    ))}
                    {unit.amenities.length > 4 && (
                      <span className="rounded-full bg-reef-deep/5 px-2.5 py-0.5 text-[11px] font-medium text-reef-deep/40">
                        +{unit.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-baobab-coral">
                      View & Book
                    </span>
                    <ArrowRight className="h-4 w-4 text-baobab-coral transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredUnits.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-lg text-reef-deep/50">
              No units found for this location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
